import { IEventConflictCheckerService } from "@event/application/ports/event-conflict-checker-service.interface";
import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { IHostedEventFactory } from "@event/application/ports/hosted-event-factory.interface";
import { ISlotReservationService } from "@event/application/ports/slot-reservation-service.interface";
import { IVenueAvailabilityService } from "@event/application/ports/venue-availability-service.interface";
import { IVenueRepositoryForEvent } from "@event/application/ports/venue-repository-for-event.interface";
import { User } from "modules/user-management/domain/user.entity";


export interface CreateEventUseCasePayload {
    name: string
    description: string
    organizer: User
    date: string
    startTime: string
    endTime: string
    venueName: string
    capacity: number
    price: number
}


export class CreateEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository,
        private readonly venueRepositoryForEvent: IVenueRepositoryForEvent,
        private readonly venueAvailabilityService: IVenueAvailabilityService,
        private readonly eventConflictService: IEventConflictCheckerService,
        private readonly hostedEventFactory: IHostedEventFactory,
        private readonly slotReservationService: ISlotReservationService
    ) {}

    async execute(payload: CreateEventUseCasePayload): Promise<string> {
        const venue = await this.venueRepositoryForEvent.findByName(payload.venueName)

        const dates = {
            date: payload.date,
            startTime: payload.startTime,
            endTime: payload.endTime
        }

        if(!venue.isOpenAt(dates)) {
            throw new Error("Event dates are not in opening hours of the place")
        }
        
        const event = this.hostedEventFactory.create(payload, venue.props.id)
        event.validateOrThrow()

        const conflict = await this.eventConflictService.hasConflictWith(event)
        if(conflict) {
            throw new Error("Already event exists with the same data")
        }

        const venueIsAvailable = await this.venueAvailabilityService.isSlotAvailable(venue.props.id, dates)
        if(!venueIsAvailable) {
            throw new Error("Slot is not available")
        }

        return this.eventRepository.runInTransaction(async (txRepo) => {
            await txRepo.save(event)
            await this.slotReservationService.reserveSlot(venue.props.id, dates)
            return event.props.id
        })

    }
}
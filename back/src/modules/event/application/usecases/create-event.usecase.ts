import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { IVenueAvailabilityService } from "@event/application/ports/venue-availability-service.interface";
import { IVenueRepository } from "@event/application/ports/venue-repository.interface";
import { Organizer } from "@organizer/domain/organizer.entity";
import { IEventConflictCheckerService } from "@event/application/ports/event-conflict-checker-service.interface";
import { IHostedEventFactory } from "@event/application/ports/hosted-event-factory.interface";
import { ISlotReservationService } from "@event/application/ports/slot-reservation-service.interface";
import { combineDateTime, extractEventDates } from "@event/application/utils/datetime";



export interface CreateEventUseCasePayload {
    name: string
    description: string
    organizer: Organizer
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
        private readonly venueRepository: IVenueRepository,
        private readonly venueAvailabilityService: IVenueAvailabilityService,
        private readonly eventConflictService: IEventConflictCheckerService,
        private readonly hostedEventFactory: IHostedEventFactory,
        private readonly slotReservationService: ISlotReservationService
    ) {}

    async execute(payload: CreateEventUseCasePayload): Promise<string> {
        const venue = await this.venueRepository.findByName(payload.venueName)

        const dates = extractEventDates(payload)

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

        await this.slotReservationService.reserveSlot(venue.props.id, dates)

        await this.eventRepository.save(event)

        return event.props.id
    }
}
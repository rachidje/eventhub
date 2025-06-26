import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { IVenueAvailabilityService } from "@event/application/ports/venue-availability-service.interface";
import { IVenueRepository } from "@event/application/ports/venue-repository.interface";
import { Organizer } from "@organizer/domain/organizer.entity";
import { IEventConflictCheckerService } from "../ports/event-conflict-checker-service.interface";
import { IHostedEventFactory } from "../ports/hosted-event-factory.interface";
import { ISlotReservationService } from "../ports/slot-reservation-service.interface";


export interface CreateEventUseCasePayload {
    name: string
    description: string
    organizer: Organizer
    dates: {
        start: Date,
        end: Date
    },
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
        if(!venue) throw new Error("Venue not found")

        if(!venue.isOpenAt(payload.dates)) {
            throw new Error("Event dates are not in opening hours of the place")
        }
        
        const event = this.hostedEventFactory.create(payload, venue.props.id)
        event.validateOrThrow()

        const conflict = await this.eventConflictService.hasConflictWith(event)
        if(conflict) {
            throw new Error("Already event exists with the same data")
        }

        const venueIsAvailable = await this.venueAvailabilityService.isSlotAvailable(venue.props.id, payload.dates)
        if(!venueIsAvailable) {
            throw new Error("Slot is not available")
        }

        await this.slotReservationService.reserveSlot(venue.props.id, payload.dates)

        await this.eventRepository.save(event)

        return event.props.id
    }
}
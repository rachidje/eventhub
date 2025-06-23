import { Organizer } from "../../../organizer/domain/organizer.entity";
import { EventStatus } from "../../domain/enums/event-status";
import { HostedEvent } from "../../domain/hosted-event.entity";
import { EventDates } from "../../domain/value-objects/event-dates";
import { EventPlace } from "../../domain/value-objects/event-place";
import { IEventRepository } from "../ports/event-repository.interface";
import { IVenueAvailabilityService } from "../ports/venue-availability-service.interface";
import { IVenueRepository } from "../ports/venue-repository.interface";


interface CreateEventUseCasePayload {
    name: string
    description: string
    organizer: Organizer
    dates: {
        start: Date
        end: Date
    },
    location: {
        name: string
        address: string
        postalCode: string
        city: string
        country: string
    },
    capacity: number
}

export class CreateEventUseCase {
    constructor(
        private readonly repository: IEventRepository,
        private readonly venueRepository: IVenueRepository,
        private readonly venueAvailabilityService: IVenueAvailabilityService
    ) {}

    async execute(payload: CreateEventUseCasePayload): Promise<void> {
        const events = await this.repository.findByOrganizerAndStatus(
            payload.organizer,
            [EventStatus.SCHEDULED, EventStatus.PUBLISHED]
        )
        
        const event = new HostedEvent({
            id: "evt-001",
            name: payload.name,
            description: payload.description,
            organizer: payload.organizer,
            status: EventStatus.SCHEDULED,
            dates: new EventDates({
                start: payload.dates.start,
                end: payload.dates.end
            }),
            location: new EventPlace({
                name: payload.location.name,
                address: payload.location.address,
                postalCode: payload.location.postalCode,
                city: payload.location.city,
                country: payload.location.country
            }),
            capacity: payload.capacity
        })

        if (event.hasConflictWith(events)) {
            throw new Error("Event with same data already exists")
        }
        
        event.validateOrThrow()
        
        const venue = await this.venueRepository.findByName(payload.location.name)
        if(venue && !venue.isOpenAt(payload.dates)) {
            throw new Error("Event dates are not in opening hours of the venue")
        }

        const venueIsAvailable = await this.venueAvailabilityService.isSlotAvailable(venue!.venueId(), payload.dates)
        if(venue && !venueIsAvailable) {
            throw new Error("The slot is not available")
        }
    }
}
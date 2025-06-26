import { Slot } from "@calendar/domain/value-objects/slot";
import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { IVenueAvailabilityService } from "@event/application/ports/venue-availability-service.interface";
import { IVenueRepository } from "@event/application/ports/venue-repository.interface";
import { EventStatus } from "@event/domain/enums/event-status";
import { HostedEvent } from "@event/domain/hosted-event.entity";
import { Organizer } from "@organizer/domain/organizer.entity";
import { ICalendarRepository } from "../ports/calendar-repository.interface";


interface CreateEventUseCasePayload {
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
        private readonly repository: IEventRepository,
        private readonly venueRepository: IVenueRepository,
        private readonly venueAvailabilityService: IVenueAvailabilityService,
        private readonly calendarRepository: ICalendarRepository
    ) {}

    async execute(payload: CreateEventUseCasePayload): Promise<string> {
        const venue = await this.venueRepository.findByName(payload.venueName)

        const event = new HostedEvent({
            id: "event-001",
            name: payload.name,
            description: payload.description,
            organizer: payload.organizer,
            dates: {
                start: payload.dates.start,
                end: payload.dates.end
            },
            capacity: payload.capacity,
            price: payload.price,
            venueId: venue!.props.id,
            status: EventStatus.SCHEDULED,
        })

        event.validateOrThrow()

        const events = await this.repository.findByOrganizerAndStatus(payload.organizer.props.id, [EventStatus.SCHEDULED, EventStatus.PUBLISHED])

        if(event.hasConflictWith(events)) {
            throw new Error("Already event exists with the same data")
        }

        if(!venue!.isOpenAt(payload.dates)) {
            throw new Error("Event dates are not in opening hours of the place")
        }

        const venueIsAvailable = await this.venueAvailabilityService.isSlotAvailable(venue!.props.id, payload.dates)
        if(!venueIsAvailable) {
            throw new Error("Slot is not available")
        }

        await this.calendarRepository.save(new Slot({
            start: payload.dates.start,
            end: payload.dates.end,
            venueId: venue!.props.id
        }))

        await this.repository.save(event)

        return event.props.id

    }
}
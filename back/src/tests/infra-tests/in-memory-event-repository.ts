import { IEventRepositoryForCalendar } from "@calendar/application/ports/event-repository-for-calendar.interface"
import { IEventRepository } from "@event/application/ports/event-repository.interface"
import { EventStatus } from "@event/domain/enums/event-status"
import { HostedEvent } from "@event/domain/hosted-event.entity"

export class InMemoryEventRepository implements IEventRepository, IEventRepositoryForCalendar {
    private events: HostedEvent[]
    constructor() {
        this.events = []
    }

    async save(event: HostedEvent): Promise<void> {
        this.events.push(event)
    }

    async findByOrganizerAndStatus(organizerId: string, statuses: EventStatus[]): Promise<HostedEvent[]> {
        return this.events.filter(event => 
            event.props.organizer.props.id === organizerId &&
            statuses.includes(event.props.status)
        )
    }

    async findEventsAtVenue(venueId: string): Promise<HostedEvent[]> {
        return this.events.filter(event => event.props.venueId === venueId)
    }

    async findById(id: string): Promise<HostedEvent | null> {
        return this.events.find(event => event.props.id === id) || null
    }
}
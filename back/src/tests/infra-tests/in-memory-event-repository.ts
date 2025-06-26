import { IEventRepository as IEventRepositoryForCalendarContext } from "@calendar/application/ports/event-repository.interface"
import { IEventRepository } from "@event/application/ports/event-repository.interface"
import { EventStatus } from "@event/domain/enums/event-status"
import { HostedEvent } from "@event/domain/hosted-event.entity"
import { Organizer } from "@organizer/domain/organizer.entity"

export class InMemoryEventRepository implements IEventRepository, IEventRepositoryForCalendarContext {
    private events: HostedEvent[]
    constructor() {
        this.events = []
    }

    async save(event: HostedEvent): Promise<void> {
        this.events.push(event)
    }

    async findByOrganizerAndStatus(user: Organizer, statuses: EventStatus[]): Promise<HostedEvent[]> {
        return this.events.filter(event => 
            event.wasOrganizedBy(user) && 
            event.hasOneOfStatus(statuses)
        )
    }

    async findEventsAtVenue(name: string): Promise<HostedEvent[]> {
        return this.events.filter(event => event.hasVenueName(name))
    }
}
import { IEventRepository } from "../../modules/event/application/ports/event-repository.interface"
import { EventStatus } from "../../modules/event/domain/enums/event-status"
import { HostedEvent } from "../../modules/event/domain/hosted-event.entity"
import { Organizer } from "../../modules/organizer/domain/organizer.entity"

export class InMemoryEventRepository implements IEventRepository {
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
}
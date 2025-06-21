import { User } from "../../../user/domain/user.entity"
import { IEventRepository } from "../../application/ports/event-repository.interface"
import { EventStatus } from "../../domain/enums/event-status"
import { HostedEvent } from "../../domain/hosted-event.entity"

export class InMemoryEventRepository implements IEventRepository {
    private events: HostedEvent[]
    constructor() {
        this.events = []
    }

    async save(event: HostedEvent): Promise<void> {
        this.events.push(event)
    }

    async findByOrganizerAndStatus(user: User, statuses: EventStatus[]): Promise<HostedEvent[]> {
        return this.events.filter(event => 
            event.wasOrganizedBy(user) && 
            event.hasOneOfStatus(statuses)
        )
    }
}
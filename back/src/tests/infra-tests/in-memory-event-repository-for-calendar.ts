import { IEventRepository } from "@calendar/application/ports/event-repository.interface";
import { HostedEvent } from "@event/domain/hosted-event.entity";

export class InMemoryEventRepository implements IEventRepository {
    constructor(public events: HostedEvent[] = []) {}

    async findEventsAtVenue(name: string): Promise<HostedEvent[]> {
        return this.events.filter(event => event.hasVenueName(name))
    }
}
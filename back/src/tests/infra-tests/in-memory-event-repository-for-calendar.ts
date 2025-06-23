import { IEventRepository } from "../../modules/calendar/application/ports/event-repository.interface";
import { HostedEvent } from "../../modules/event/domain/hosted-event.entity";

export class InMemoryEventRepository implements IEventRepository {
    constructor(public events: HostedEvent[] = []) {}

    async findEventsAtVenue(name: string): Promise<HostedEvent[]> {
        return this.events.filter(event => event.hasVenueName(name))
    }
}
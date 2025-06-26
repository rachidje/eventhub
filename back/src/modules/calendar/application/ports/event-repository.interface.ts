import { HostedEvent } from "@event/domain/hosted-event.entity";

export interface IEventRepository {
    findEventsAtVenue(venueId: string): Promise<HostedEvent[]>
}
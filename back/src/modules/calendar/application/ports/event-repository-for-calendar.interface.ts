import { HostedEvent } from "@event/domain/hosted-event.entity";

export interface IEventRepositoryForCalendar {
    findEventsAtVenue(venueId: string): Promise<HostedEvent[]>
}
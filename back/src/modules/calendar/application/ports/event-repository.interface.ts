import { HostedEvent } from "../../../event/domain/hosted-event.entity";

export interface IEventRepository {
    findEventsAtVenue(name: string): Promise<HostedEvent[]>
}
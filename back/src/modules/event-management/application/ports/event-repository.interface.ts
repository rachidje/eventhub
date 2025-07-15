import { EventStatus } from "@event/domain/enums/event-status"
import { HostedEvent } from "@event/domain/hosted-event.entity"


export interface IEventRepository {
    findByOrganizerAndStatus(organizerId: string, statuses: EventStatus[]): Promise<HostedEvent[]>
    save(event: HostedEvent): Promise<void>
    findById(id: string): Promise<HostedEvent | null>
}
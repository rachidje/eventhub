import { EventStatus } from "@event/domain/enums/event-status"
import { HostedEvent } from "@event/domain/hosted-event.entity"
import { Organizer } from "@organizer/domain/organizer.entity"


export interface IEventRepository {
    findByOrganizerAndStatus(organizer: Organizer, statuses: EventStatus[]): Promise<HostedEvent[]>
    save(event: HostedEvent): Promise<void>
}
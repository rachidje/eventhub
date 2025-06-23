import { Organizer } from "../../../organizer/domain/organizer.entity"
import { EventStatus } from "../../domain/enums/event-status"
import { HostedEvent } from "../../domain/hosted-event.entity"

export interface IEventRepository {
    findByOrganizerAndStatus(organizer: Organizer, statuses: EventStatus[]): Promise<HostedEvent[]>
    save(event: HostedEvent): Promise<void>
}
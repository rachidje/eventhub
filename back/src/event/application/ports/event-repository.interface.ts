import { User } from "../../../user/domain/user.entity"
import { EventStatus } from "../../domain/enums/event-status"
import { HostedEvent } from "../../domain/hosted-event.entity"

export interface IEventRepository {
    findByOrganizerAndStatus(organizer: User, statuses: EventStatus[]): Promise<HostedEvent[]>
    save(event: HostedEvent): Promise<void>
}
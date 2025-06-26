import { IEventConflictCheckerService } from "@event/application/ports/event-conflict-checker-service.interface";
import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { EventStatus } from "../enums/event-status";
import { HostedEvent } from "../hosted-event.entity";

export class EventConflictService implements IEventConflictCheckerService {
    constructor(
        private readonly eventRepository: IEventRepository
    ) {}

    async hasConflictWith(event: HostedEvent): Promise<boolean> {
        const events = await this.eventRepository.findByOrganizerAndStatus(
            event.props.organizer.props.id,
            [EventStatus.SCHEDULED, EventStatus.PUBLISHED])
        return event.hasConflictWith(events)
    }
}
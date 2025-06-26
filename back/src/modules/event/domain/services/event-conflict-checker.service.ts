import { IEventConflictCheckerService } from "@event/application/ports/event-conflict-checker-service.interface";
import { HostedEvent } from "../hosted-event.entity";
import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { EventStatus } from "../enums/event-status";

export class EventConflictCheckerService implements IEventConflictCheckerService {
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
import { User } from "../../../user/domain/user.entity";
import { EventStatus } from "../../domain/enums/event-status";
import { HostedEvent } from "../../domain/hosted-event.entity";
import { InMemoryEventRepository } from "../../tests/infra-test/in-memory-event-repository";

interface CreateEventUseCasePayload {
    user: User
    event: HostedEvent
}

export class CreateEventUseCase {
    constructor(private readonly repository: InMemoryEventRepository) {}

    async execute(payload: CreateEventUseCasePayload): Promise<void> {
        const events = await this.repository.findByOrganizerAndStatus(
            payload.user, [EventStatus.SCHEDULED, EventStatus.PUBLISHED]
        )

        const conflictingEvent = events.find(event => event.isSimilarTo(payload.event))

        if (conflictingEvent) {
            throw new Error("Event with same data already exists")
        }
    }

}
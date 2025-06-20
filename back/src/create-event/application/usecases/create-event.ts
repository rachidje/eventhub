import { User } from "../../../user/domain/user.entity";
import { EventStatus } from "../../domain/enums/event-status";
import { HostedEvent } from "../../domain/hosted-event.entity";
import { InMemoryEventRepository } from "../../tests/infra-test/in-memory-event-repository";


interface CreateEventUseCasePayload {
    name: string
    description: string
    organizer: User
}

export class CreateEventUseCase {
    constructor(private readonly repository: InMemoryEventRepository) {}

    async execute(payload: CreateEventUseCasePayload): Promise<void> {
        const events = await this.repository.findByOrganizerAndStatus(
            payload.organizer,
            [EventStatus.SCHEDULED, EventStatus.PUBLISHED]
        )

        const event = new HostedEvent({
            id: "evt-001",
            name: payload.name,
            description: payload.description,
            organizer: payload.organizer,
            status: EventStatus.SCHEDULED
        })

        const conflictingEvent = events.find(event => event.isSimilarTo(event))

        if (conflictingEvent) {
            throw new Error("Event with same data already exists")
        }
    }
}
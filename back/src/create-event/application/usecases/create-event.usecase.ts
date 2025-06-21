import { User } from "../../../user/domain/user.entity";
import { EventStatus } from "../../domain/enums/event-status";
import { HostedEvent } from "../../domain/hosted-event.entity";
import { EventDates } from "../../domain/value-objects/event-dates";
import { EventPlace } from "../../domain/value-objects/event-place";
import { InMemoryEventRepository } from "../../tests/infra-test/in-memory-event-repository";


interface CreateEventUseCasePayload {
    name: string
    description: string
    organizer: User
    dates: {
        start: Date
        end: Date
    },
    location: {
        name: string
        address: string
        postalCode: string
        city: string
        country: string
    }
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
            status: EventStatus.SCHEDULED,
            dates: new EventDates({
                start: payload.dates.start,
                end: payload.dates.end
            }),
            location: new EventPlace({
                name: payload.location.name,
                address: payload.location.address,
                postalCode: payload.location.postalCode,
                city: payload.location.city,
                country: payload.location.country
            })
        })
        
        if (event.hasConflictWith(events)) {
            throw new Error("Event with same data already exists")
        }
        
        event.validateOrThrow()
    }
}
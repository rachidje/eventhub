import { IHostedEventFactory } from "@event/application/ports/hosted-event-factory.interface";
import { CreateEventUseCasePayload } from "@event/application/usecases/create-event.usecase";
import { IIdGenerator } from "modules/shared/application/ports/id-generator.interface";
import { EventStatus } from "../enums/event-status";
import { HostedEvent } from "../hosted-event.entity";

export class HostedEventFactory implements IHostedEventFactory {
    constructor(
        private readonly idGenerator: IIdGenerator
    ) {}

    create(payload: CreateEventUseCasePayload, venueId: string): HostedEvent {
        return new HostedEvent({
            id: this.idGenerator.generate(),
            name: payload.name,
            description: payload.description,
            organizer: payload.organizer,
            dates: {
                start: payload.dates.start,
                end: payload.dates.end
            },
            capacity: payload.capacity,
            price: payload.price,
            venueId: venueId,
            status: EventStatus.SCHEDULED,
        })
    }
}
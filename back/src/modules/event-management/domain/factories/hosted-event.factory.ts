import { IHostedEventFactory } from "@event/application/ports/hosted-event-factory.interface";
import { CreateEventUseCasePayload } from "@event/application/usecases/create-event.usecase";
import { combineDateTime } from "@event/application/utils/datetime";
import { IIdGenerator } from "modules/shared/application/ports/id-generator.interface";
import { EventStatus } from "../enums/event-status";
import { HostedEvent } from "../hosted-event.entity";

export class HostedEventFactory implements IHostedEventFactory {
    constructor(
        private readonly idGenerator: IIdGenerator
    ) {}

    create(payload: CreateEventUseCasePayload, venueId: string): HostedEvent {
        const start = combineDateTime(payload.date, payload.startTime)
        const end = combineDateTime(payload.date, payload.endTime)

        return new HostedEvent({
            id: this.idGenerator.generate(),
            name: payload.name,
            description: payload.description,
            organizer: payload.organizer,
            status: EventStatus.scheduled,
            dates: { start, end },
            venueId,
            capacity: payload.capacity,
            price: payload.price
        })
    }
}
import { HostedEvent } from "@event/domain/hosted-event.entity";
import { CreateEventUseCasePayload } from "../usecases/create-event.usecase";

export interface IHostedEventFactory {
    create(payload: CreateEventUseCasePayload, venueId: string): HostedEvent
}
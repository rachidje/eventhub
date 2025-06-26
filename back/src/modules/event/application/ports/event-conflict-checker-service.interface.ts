import { HostedEvent } from "@event/domain/hosted-event.entity";

export interface IEventConflictCheckerService {
    hasConflictWith(event: HostedEvent): Promise<boolean>
}
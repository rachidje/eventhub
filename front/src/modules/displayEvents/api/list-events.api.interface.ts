import type { EventListModel } from "../domain/event-list.model";

export interface IListEventsGateway {
    list(): Promise<EventListModel.EventItem[]>;
}

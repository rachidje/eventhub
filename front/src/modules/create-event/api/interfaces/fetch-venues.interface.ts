import type { EventModelDomain } from "../../domain/model/event-model.domain";

export interface IFetchVenuesRequest {
    getVenues: () => Promise<EventModelDomain.Venue[]>
}
import type { IFetchVenuesRequest } from "@eventhub/modules/create-event/api/interfaces/fetch-venues.interface";
import type { ISaveEventRequest } from "@eventhub/modules/create-event/api/interfaces/save-event.interface";

export type Dependencies = {
    fetchVenues: IFetchVenuesRequest
    saveEvent: ISaveEventRequest
};
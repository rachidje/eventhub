import type { IFetchVenuesRequest } from "@eventhub/modules/create-event/api/interfaces/fetch-venues.interface";
import type { ISaveEventRequest } from "@eventhub/modules/create-event/api/interfaces/save-event.interface";
import type { IListEventsGateway } from "@eventhub/modules/displayEvents/api/list-events.api.interface";
import type { ILoginGateway } from "@eventhub/modules/login-user/api/interfaces/login-gateway.interface";
import type { IRegisterGateway } from "@eventhub/modules/register-user/api/interfaces/register-gateway.interface";

export type Dependencies = {
    fetchVenues: IFetchVenuesRequest
    saveEvent: ISaveEventRequest
    registerGateway: IRegisterGateway
    loginUserApi: ILoginGateway
    listEventsApi: IListEventsGateway
};
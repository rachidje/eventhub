import type { EventModelDomain } from "../../domain/model/event-model.domain";

export interface ISaveEventRequest {
    saveEvent(form: EventModelDomain.Form) : Promise<{id: string}>
}
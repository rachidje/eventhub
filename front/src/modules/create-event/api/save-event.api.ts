import type { EventModelDomain } from "../domain/model/event-model.domain";
import type { ISaveEventRequest } from "./interfaces/save-event.interface";
import axios from "axios";

export class SaveEventApi implements ISaveEventRequest {
    async saveEvent(form: EventModelDomain.Form) : Promise<{ id: string; }> {
        const response = await axios.post("/api/v1/event", form)
        return response.data
    }
}
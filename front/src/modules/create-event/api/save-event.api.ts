import { padTime } from "@eventhub/shared/pad-time";
import axios from "axios";
import type { EventModelDomain } from "../domain/model/event-model.domain";
import type { ISaveEventRequest } from "./interfaces/save-event.interface";

export class SaveEventApi implements ISaveEventRequest {
    async saveEvent(form: EventModelDomain.Form) : Promise<{ id: string; }> {
        const {event} = form;

        const date = event.date.split("T")[0]
        const startTime = padTime(event.startTime)
        const endTime = padTime(event.endTime)

        const payload = {
            name: event.name,
            description: event.description,
            date,
            startTime,
            endTime,
            venueName: event.venueName,
            capacity: event.capacity,
            price: event.price
        }

        try {
            const api = axios.create({
                baseURL: "/api",
            })
            const response = await api.post("/v1/event", payload)

            if(!response.data.success) {
                throw new Error(response.data.error.message || 'Unknown error from backend')
            }

            return response.data.data
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const msg = error.response?.data?.error?.message || error.message;
                throw new Error(msg)
            }
            throw error
        }
    }
}
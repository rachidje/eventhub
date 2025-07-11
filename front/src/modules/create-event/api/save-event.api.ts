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

        const start = new Date(`${date}T${startTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);

        console.log(start)
        console.log(end)

        const payload = {
            name: event.name,
            description: event.description,
            start: start.toISOString(),
            end: end.toISOString(),
            venueName: event.venueName,
            capacity: event.capacity,
            price: event.price
        }

        try {
            const response = await axios.post("http://localhost:5000/api/v1/event", payload)

            if(!response.data.success) {
                throw new Error(response.data.error.message || 'Unknown error from backend')
            }

            console.log(response.data)
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
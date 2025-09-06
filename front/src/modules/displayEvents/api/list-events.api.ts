import axios from "axios";
import type { IListEventsGateway } from "./list-events.api.interface";

export class ListEventsApi implements IListEventsGateway {
    async list(): Promise<any> {
        try {
            const response = await axios.get("/api/v1/event")

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
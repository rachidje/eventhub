import { parseISO } from "date-fns";
import { CreateEventUseCasePayload } from "@event/application/usecases/create-event.usecase";

export function combineDateTime(date: string, time: string): Date {
    return parseISO(`${date}T${time}:00.000Z`)
}


export function extractEventDates(payload: CreateEventUseCasePayload): { start: Date; end: Date } {
    return {
        start: combineDateTime(payload.date, payload.startTime),
        end: combineDateTime(payload.date, payload.endTime)
    }
}

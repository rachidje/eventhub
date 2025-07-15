import { parseISO, set } from "date-fns";
import { CreateEventUseCasePayload } from "@event/application/usecases/create-event.usecase";

export function combineDateTime(date: string, time: string): Date {
    const [year, month, day] = date.split("-").map(Number)
    const [hours, minutes] = time.split(":").map(Number)

    return set(new Date(year, month - 1, day), {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0
    })
}

import { Calendar } from "@calendar/domain/calendar.entity";

export interface ICalendarRepository {
    save(calendar: Calendar): Promise<void>
}
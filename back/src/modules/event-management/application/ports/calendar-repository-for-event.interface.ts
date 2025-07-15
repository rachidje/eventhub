import { Calendar } from "@calendar/domain/calendar.entity";

export interface ICalendarRepositoryForEvent {
    findByVenueId(id: string): Promise<Calendar | null>
    save(calendar: Calendar): Promise<void>
}
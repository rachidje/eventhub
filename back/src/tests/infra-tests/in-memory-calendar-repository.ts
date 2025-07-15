import { ICalendarRepository } from "@calendar/application/ports/calendar-repository.interface";
import { Calendar } from "@calendar/domain/calendar.entity";
import { ICalendarRepositoryForEvent } from "@event/application/ports/calendar-repository-for-event.interface";


export class InMemoryCalendarRepository implements ICalendarRepository, ICalendarRepositoryForEvent {
    private readonly calendars: Map<string, Calendar> = new Map()

    async findByVenueId(venueId: string): Promise<Calendar | null> {
        return this.calendars.get(venueId) ?? null
    }

    async save(calendar: Calendar): Promise<void> {
        this.calendars.set(calendar.venueId, calendar)
    }
}
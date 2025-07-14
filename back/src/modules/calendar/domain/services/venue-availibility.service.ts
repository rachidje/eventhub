import { IEventRepositoryForCalendar } from "@calendar/application/ports/event-repository-for-calendar.interface";
import { IVenueRepositoryForCalendar } from "@calendar/application/ports/venue-repository-for-calendar.interface";

export class VenueAvailabilityService {
    constructor(
        private readonly venueRepositoryForCalendar: IVenueRepositoryForCalendar,
        private readonly eventRepository: IEventRepositoryForCalendar 
    ) {}

    async isSlotAvailable(venueId: string, dates: {start: Date, end: Date}): Promise<boolean> {
        const venue = await this.venueRepositoryForCalendar.findById(venueId);
        if(!venue?.isOpenAt(dates)) return false

        const events = await this.eventRepository.findEventsAtVenue(venueId)
        const conflict = events.some(event => event.conflictsWithDates(dates))

        return !conflict
    }
} 
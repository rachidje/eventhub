import { IEventRepository } from "@calendar/application/ports/event-repository.interface";
import { IVenueRepository } from "@calendar/application/ports/venue-repository.interface";

export class VenueAvailabilityService {
    constructor(
        private readonly venueRepository: IVenueRepository,
        private readonly eventRepository: IEventRepository 
    ) {}

    async isSlotAvailable(venueName: string, dates: {start: Date, end: Date}): Promise<boolean> {
        console.log(venueName)
        const venue = await this.venueRepository.findByName(venueName);
        if(!venue?.isOpenAt(dates)) return false

        const events = await this.eventRepository.findEventsAtVenue(venueName)
        console.log(events)
        const conflict = events.some(event => event.conflictsWithDates(dates))
        console.log(conflict)

        return !conflict
    }
}
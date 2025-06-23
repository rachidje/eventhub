import { IEventRepository } from "../../application/ports/event-repository.interface";
import { IVenueRepository } from "../../application/ports/venue-repository.interface";

export class VenueAvailabilityService {
    constructor(
        private readonly venueRepository: IVenueRepository,
        private readonly eventRepository: IEventRepository 
    ) {}

    async isSlotAvailable(venueId: string, dates: {start: Date, end: Date}): Promise<boolean> {
        const venue = await this.venueRepository.findById(venueId);
        if(!venue?.isOpenAt(dates)) return false

        const events = await this.eventRepository.findEventsAtVenue(venueId)
        const conflict = events.some(event => event.conflictsWithDates(dates))

        return !conflict
    }
}
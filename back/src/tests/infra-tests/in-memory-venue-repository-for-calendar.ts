import { IVenueRepository } from "../../modules/calendar/application/ports/venue-repository.interface";
import { Venue } from "../../modules/venue/domain/venue.entity";

export class InMemoryVenueRepository implements IVenueRepository {
    constructor(public venues: Venue[] = []) {}

    async findById(id: string): Promise<Venue | null> {
        return this.venues.find(venue => venue.venueId() === id) || null
    }
}
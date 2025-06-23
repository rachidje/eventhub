// venue/tests/infra-test/in-memory-venue-repository.ts
import { IVenueRepository } from "../../modules/event/application/ports/venue-repository.interface";
import { Venue } from "../../modules/venue/domain/venue.entity";

export class InMemoryVenueRepository implements IVenueRepository {
    private venues: Venue[]

    constructor() {
        this.venues = []
    }

    async save(venue: Venue): Promise<void> {
        this.venues.push(venue)
    }

    async findByName(name: string): Promise<Venue | null> {
        return this.venues.find(venue => venue.hasName(name)) || null
    }
}
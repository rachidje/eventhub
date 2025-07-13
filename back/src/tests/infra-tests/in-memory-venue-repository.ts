// venue/tests/infra-test/in-memory-venue-repository.ts
import { IVenueRepository as IVenueRepositoryForCalendarContext } from "@calendar/application/ports/venue-repository.interface";
import { IVenueRepository } from "@event/application/ports/venue-repository.interface";
import { Venue } from "@venue/domain/venue.entity";

export class InMemoryVenueRepository implements IVenueRepository, IVenueRepositoryForCalendarContext {
    private venues: Venue[]

    constructor() {
        this.venues = []
    }

    async save(venue: Venue): Promise<void> {
        this.venues.push(venue)
    }

    async findByName(name: string): Promise<Venue> {
        const venue = this.venues.find(venue => venue.props.name === name) 
        if(!venue) throw new Error("Venue not found")
        return venue
    }

    async findById(id: string): Promise<Venue | null> {
        return this.venues.find(venue => venue.props.id === id) || null
    }
}
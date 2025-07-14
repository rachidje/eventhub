// venue/tests/infra-test/in-memory-venue-repository.ts

import { IVenueRepositoryForCalendar } from "@calendar/application/ports/venue-repository-for-calendar.interface";
import { IVenueRepositoryForEvent } from "@event/application/ports/venue-repository-for-event.interface";
import { Venue } from "@venue/domain/venue.entity";

export class InMemoryVenueRepository implements IVenueRepositoryForEvent, IVenueRepositoryForCalendar {
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
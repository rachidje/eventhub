// event/application/ports/venue-repository.interface.ts

import { Venue } from "@venue/domain/venue.entity"

export interface IVenueRepository {
    save(venue: Venue): Promise<void>
    findByName(name: string): Promise<Venue | null>
}
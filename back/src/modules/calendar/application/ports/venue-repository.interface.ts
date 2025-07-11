import { Venue } from "@venue/domain/venue.entity";

export interface IVenueRepository {
    findById(id: string): Promise<Venue | null>
    findByName(name: string): Promise<Venue | null>
}
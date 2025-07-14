import { Venue } from "@venue/domain/venue.entity";

export interface IVenueRepositoryForCalendar {
    findById(id: string): Promise<Venue | null>
    findByName(name: string): Promise<Venue | null>
}
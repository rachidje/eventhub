import { Venue } from "@venue/domain/venue.entity";
import { DIContainer } from "types/di-container";
import { IFixture } from "./fixture.interface";

export class VenueFixture implements IFixture {
    constructor(public entity: Venue) {}

    async load(container: DIContainer): Promise<void> {
        await container.resolve('venueRepositoryForEvent').save(this.entity);
    }
}
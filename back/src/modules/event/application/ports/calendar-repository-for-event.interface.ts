import { Slot } from "@calendar/domain/value-objects/slot";

export interface ICalendarRepositoryForEvent {
    findByVenueId(id: string): Promise<Slot | null>
    save(slot: Slot): Promise<void>
}
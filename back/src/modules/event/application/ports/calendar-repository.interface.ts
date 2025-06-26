import { Slot } from "@calendar/domain/value-objects/slot";

export interface ICalendarRepository {
    findByVenueId(id: string): Promise<Slot | null>
    save(slot: Slot): Promise<void>
}
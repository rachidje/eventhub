import { Slot } from "@calendar/domain/value-objects/slot";

export interface ICalendarRepository {
    findById(id: string): Promise<Slot | null>
    save(slot: Slot): Promise<void>
}
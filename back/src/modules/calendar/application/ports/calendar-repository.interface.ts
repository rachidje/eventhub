import { Slot } from "../../domain/value-objects/slot";

export interface ICalendarRepository {
    save(slot: Slot): Promise<void>
}
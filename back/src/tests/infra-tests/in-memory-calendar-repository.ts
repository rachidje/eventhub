import { ICalendarRepository } from "../../modules/calendar/application/ports/calendar-repository.interface";
import { Slot } from "../../modules/calendar/domain/value-objects/slot";

export class InMemoryCalendarRepository implements ICalendarRepository {

    constructor(public slots: Slot[] = []) {}

    async save(slot: Slot): Promise<void> {
        this.slots.push(slot)
    }
}
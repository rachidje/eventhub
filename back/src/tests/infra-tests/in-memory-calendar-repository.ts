import { ICalendarRepository } from "@calendar/application/ports/calendar-repository.interface";
import { Slot } from "@calendar/domain/value-objects/slot";
import { ICalendarRepository as ICalendarRepositoryForEventContext } from "@event/application/ports/calendar-repository.interface";


export class InMemoryCalendarRepository implements ICalendarRepository, ICalendarRepositoryForEventContext  {

    constructor(public slots: Slot[] = []) {}

    async save(slot: Slot): Promise<void> {
        this.slots.push(slot)
    }

    async findById(id: string): Promise<Slot | null> {
        return this.slots.find(slot => slot.id() === id) || null
    }
}
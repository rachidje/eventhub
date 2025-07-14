import { ICalendarRepository } from "@calendar/application/ports/calendar-repository.interface";
import { Slot } from "@calendar/domain/value-objects/slot";
import { ICalendarRepositoryForEvent } from "@event/application/ports/calendar-repository-for-event.interface";


export class InMemoryCalendarRepository implements ICalendarRepository, ICalendarRepositoryForEvent  {

    constructor(public slots: Slot[] = []) {}

    async save(slot: Slot): Promise<void> {
        this.slots.push(slot)
    }

    async findByVenueId(id: string): Promise<Slot | null> {
        return this.slots.find(slot => slot.props.venueId === id) || null
    }
}
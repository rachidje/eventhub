import { ICalendarRepositoryForEvent } from "@event/application/ports/calendar-repository-for-event.interface";
import { ISlotReservationService } from "@event/application/ports/slot-reservation-service.interface";
import { Slot } from "../value-objects/slot";

export class SlotReservationService implements ISlotReservationService {
    constructor(
        private readonly calendarRepositoryForEvent: ICalendarRepositoryForEvent
    ) {}

    async reserveSlot(venueId: string, dates: {start: Date, end: Date}): Promise<void> {
        await this.calendarRepositoryForEvent.save(new Slot({
            start: dates.start,
            end: dates.end,
            venueId: venueId
        }))
    }
}
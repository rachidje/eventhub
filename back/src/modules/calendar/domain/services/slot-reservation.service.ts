import { ISlotReservationService } from "@event/application/ports/slot-reservation-service.interface";
import { Slot, SlotDates } from "../value-objects/slot";
import { ICalendarRepositoryForEvent } from "modules/event-management/application/ports/calendar-repository-for-event.interface";
import { Calendar } from "../calendar.entity";

export class SlotReservationService implements ISlotReservationService {
    constructor(
        private readonly calendarRepositoryForEvent: ICalendarRepositoryForEvent
    ) {}

    async reserveSlot(venueId: string, dates: SlotDates): Promise<void> {
        let calendar = await this.calendarRepositoryForEvent.findByVenueId(venueId)

        if(calendar === null) {
            calendar = new Calendar(venueId)
        }

        calendar.addSlot(dates)
        await this.calendarRepositoryForEvent.save(calendar)
    }
}
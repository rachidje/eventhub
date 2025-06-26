import { ICalendarRepository } from "@event/application/ports/calendar-repository.interface";
import { ISlotReservationService } from "@event/application/ports/slot-reservation-service.interface";
import { Slot } from "../value-objects/slot";

export class SlotReservationService implements ISlotReservationService {
    constructor(
        private readonly calendarRepository: ICalendarRepository
    ) {}

    async reserveSlot(venueId: string, dates: {start: Date, end: Date}): Promise<void> {
        await this.calendarRepository.save(new Slot({
            start: dates.start,
            end: dates.end,
            venueId: venueId
        }))
    }
}
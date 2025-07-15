import { SlotDates } from "@calendar/domain/value-objects/slot";

export interface ISlotReservationService {
    reserveSlot(venueId: string, dates: SlotDates): Promise<void>
}
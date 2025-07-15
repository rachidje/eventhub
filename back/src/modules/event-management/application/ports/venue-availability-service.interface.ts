import { SlotDates } from "@calendar/domain/value-objects/slot";

export interface IVenueAvailabilityService {
    isSlotAvailable(venueId: string, dates: SlotDates): Promise<boolean>
}
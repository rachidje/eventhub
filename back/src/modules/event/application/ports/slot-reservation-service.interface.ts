export interface ISlotReservationService {
    reserveSlot(venueId: string, dates: {start: Date, end: Date}): Promise<void>
}
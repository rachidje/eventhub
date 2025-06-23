export interface IVenueAvailabilityService {
    isSlotAvailable(venueId: string, dates: {start: Date, end: Date}): Promise<boolean>
}
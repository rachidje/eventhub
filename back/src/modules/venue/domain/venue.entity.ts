// venue/domain/venue.entity.ts
import { SlotDates } from "@calendar/domain/value-objects/slot"
import { Address } from "./value-objects/adress"
import { WeeklySchedule } from "./value-objects/weekly-schedule"

export interface VenueProps {
    id: string
    name: string
    address: Address
    weeklySchedule: WeeklySchedule
}

export class Venue {
    constructor(public props: VenueProps) {}

    isOpenAt(dates: SlotDates): boolean {
        return this.props.weeklySchedule.isOpenDuring(dates)
    }
}
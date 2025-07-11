// venue/domain/venue.entity.ts
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

    isOpenAt(dates: {start: Date, end: Date}): boolean {
        return this.props.weeklySchedule.isOpenDuring(dates)
    }
}
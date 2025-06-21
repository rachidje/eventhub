// venue/domain/venue.entity.ts
import { EventDates } from "../../event/domain/value-objects/event-dates"
import { Address } from "./value-objects/adress"
import { WeeklySchedule } from "./value-objects/weekly-schedule"

export interface VenueProps {
    id: string
    name: string
    address: Address
    weeklySchedule: WeeklySchedule
}

export class Venue {
    constructor(private props: VenueProps) {}

    hasName(name: string): boolean {
        return this.props.name === name
    }

    isOpenAt(dates: {start: Date, end: Date}): boolean {
        return this.props.weeklySchedule.isOpenDuring(dates)
    }
}
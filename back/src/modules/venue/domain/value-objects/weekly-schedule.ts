// venue/domain/value-objects/weekly-schedule.ts
import { SlotDates } from "@calendar/domain/value-objects/slot"
import { combineDateTime } from "@event/application/utils/datetime"

type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

type OpeningSlot = {
    start: string
    end: string
}

export type WeeklyScheduleProps = Partial<Record<DayOfWeek, OpeningSlot[]>>

export class WeeklySchedule {
    constructor(private readonly props: WeeklyScheduleProps) {}

    static from(props: WeeklyScheduleProps): WeeklySchedule {
        return new WeeklySchedule(props)
    }

    toJSON(): WeeklyScheduleProps {
        return this.props
    }

    isOpenDuring({date, startTime, endTime}: SlotDates): boolean {
        const start = combineDateTime(date, startTime)
        const end = combineDateTime(date, endTime)
        const days = this.dayOf(start)

        const slots = this.props[days] ?? []

        return slots.some(slot => {
            const rangeStart = combineDateTime(date, slot.start)
            const rangeEnd = combineDateTime(date, slot.end)
            return start >= rangeStart && end <= rangeEnd
        })
    }

    private dayOf(date: Date): DayOfWeek {
        const days: DayOfWeek[] = [
        "sunday", "monday", "tuesday", "wednesday",
        "thursday", "friday", "saturday"
        ]
        return days[date.getDay()]
    }
}
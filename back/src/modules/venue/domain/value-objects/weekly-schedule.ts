// venue/domain/value-objects/weekly-schedule.ts
import { set } from "date-fns"

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

    isOpenDuring({ start, end }: { start: Date; end: Date }): boolean {
        const day = this.dayOf(start)
        const slots = this.props[day] ?? []

        return slots.some(slot => {
            const rangeStart = this.setTime(start, slot.start)
            const rangeEnd = this.setTime(start, slot.end)
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

    private setTime(base: Date, time: string): Date {
        const [hours, minutes] = time.split(":").map(Number)
        return set(base, { hours, minutes, seconds: 0, milliseconds: 0 })
    }

    
}
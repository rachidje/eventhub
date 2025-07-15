import { combineDateTime } from "@event/application/utils/datetime"

export type SlotDates = {
    date: string
    startTime: string
    endTime: string
}

export interface SlotProps extends SlotDates {
    venueId: string
}

export class Slot {
    constructor(public props: SlotProps) {}

    conflictsWith(candidate: Slot): boolean {
        const aStart = combineDateTime(this.props.date, this.props.startTime)
        const aEnd = combineDateTime(this.props.date, this.props.endTime)

        const bStart = combineDateTime(candidate.props.date, candidate.props.startTime)
        const bEnd = combineDateTime(candidate.props.date, candidate.props.endTime)

        return aStart < bEnd && bStart < aEnd
    }

}
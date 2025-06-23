import { differenceInBusinessDays, differenceInHours } from "date-fns"

export interface EventDateProps {
    start: Date
    end: Date
}

export class EventDates {
    constructor(private props: EventDateProps) {}

    equals(eventDate: EventDates): boolean {
        return this.props.start.getDate() === eventDate.props.start.getDate()
            && this.props.end.getDate() === eventDate.props.end.getDate()
    }

    conflictsWith(eventDate: {start: Date, end: Date}): boolean {
        return !(this.props.end <= eventDate.start || this.props.start >= eventDate.end);
    }

    isInThePast(): boolean {
        return this.props.start < new Date() || this.props.end < new Date()
    }

    isTooSoon(): boolean {
        return differenceInBusinessDays(this.props.start, new Date()) < 3
    }

    isTooLong(): boolean {
        return differenceInHours(this.props.end, this.props.start) > 3
    }
}
export interface EventDateProps {
    start: Date
    end: Date
}

export class EventDates {
    constructor(private props: EventDateProps) {}

    equals(eventDate: EventDates): boolean {
        return this.props.start.getTime() === eventDate.props.start.getTime()
            && this.props.end.getTime() === eventDate.props.end.getTime()
    }
}
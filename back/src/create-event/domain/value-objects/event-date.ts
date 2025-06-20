export interface EventDateProps {
    start: Date
    end: Date
}

export class EventDate {
    constructor(private props: EventDateProps) {}

    equals(eventDate: EventDate): boolean {
        return this.props.start.getTime() === eventDate.props.start.getTime()
            && this.props.end.getTime() === eventDate.props.end.getTime()
    }
}
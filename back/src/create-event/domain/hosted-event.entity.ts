import stringSimilarity from "string-similarity"
import { User } from "../../user/domain/user.entity"
import { EventStatus } from "./enums/event-status"
import { EventDates } from "./value-objects/event-dates"
import { EventPlace } from "./value-objects/event-place"

export interface HostedEventProps {
    id: string
    name: string
    description: string
    organizer: User
    status: EventStatus
    dates: EventDates
    location: EventPlace
}

export class HostedEvent {
    constructor(private props: HostedEventProps) {}

    wasOrganizedBy(user: User): boolean {
        return this.props.organizer === user
    }

    hasOneOfStatus(statuses: EventStatus[]): boolean {
        return statuses.includes(this.props.status)
    }

    hasConflictWith(events: HostedEvent[]): boolean {
        return events.find(event => event.isSimilarTo(this)) !== undefined
    }

    isSimilarTo(event: HostedEvent): boolean {
        return this.isTextuallyCloseTo(event) &&
            this.props.dates.equals(event.props.dates) &&
            this.props.location.equals(event.props.location)
    }

    private isTextuallyCloseTo(event: HostedEvent): boolean {
        return stringSimilarity.compareTwoStrings(this.props.name, event.props.name) > 0.8 &&
            stringSimilarity.compareTwoStrings(this.props.description, event.props.description) > 0.8
    }

    validateOrThrow(): void {
        if (this.props.dates.isInThePast()) {
            throw new Error("Event dates are in the past")
        }
    }
}
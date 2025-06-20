import { User } from "../../user/domain/user.entity"
import { EventStatus } from "./enums/event-status"
import { EventDate } from "./value-objects/event-date"
import { EventPlace } from "./value-objects/event-place"
import stringSimilarity from "string-similarity"

export interface HostedEventProps {
    id: string
    name: string
    description: string
    schedule: EventDate
    location: EventPlace
    status: EventStatus
    organizer: User
}

export class HostedEvent {
    constructor(private props: HostedEventProps) {}

    wasOrganizedBy(user: User): boolean {
        return this.props.organizer === user
    }

    hasStatus(): EventStatus {
        return this.props.status
    }

    isSimilarTo(event: HostedEvent): boolean {
        return this.props.schedule.equals(event.props.schedule)
            && this.props.location.equals(event.props.location)
            && this.isTextuallyCloseTo(event)
    }

    private isTextuallyCloseTo(event: HostedEvent): boolean {
        return stringSimilarity.compareTwoStrings(this.props.name, event.props.name) > 0.8 &&
            stringSimilarity.compareTwoStrings(this.props.description, event.props.description) > 0.8
    }

}
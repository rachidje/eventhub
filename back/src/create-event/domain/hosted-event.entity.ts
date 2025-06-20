import stringSimilarity from "string-similarity"
import { User } from "../../user/domain/user.entity"
import { EventStatus } from "./enums/event-status"

export interface HostedEventProps {
    id: string
    name: string
    description: string
    organizer: User
    status: EventStatus
}

export class HostedEvent {
    constructor(private props: HostedEventProps) {}

    wasOrganizedBy(user: User): boolean {
        return this.props.organizer === user
    }

    hasOneOfStatus(statuses: EventStatus[]): boolean {
        return statuses.includes(this.props.status)
    }

    isSimilarTo(event: HostedEvent): boolean {
        return this.isTextuallyCloseTo(event)
    }

    private isTextuallyCloseTo(event: HostedEvent): boolean {
        return stringSimilarity.compareTwoStrings(this.props.name, event.props.name) > 0.8 &&
            stringSimilarity.compareTwoStrings(this.props.description, event.props.description) > 0.8
    }
}
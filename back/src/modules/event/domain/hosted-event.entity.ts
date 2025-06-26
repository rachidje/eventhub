import { Organizer } from "@organizer/domain/organizer.entity"
import stringSimilarity from "string-similarity"
import { EventStatus } from "./enums/event-status"
import { EventDates } from "./value-objects/event-dates"
import { EventPlace } from "./value-objects/event-place"


export interface HostedEventProps {
    id: string
    name: string
    description: string
    organizer: Organizer
    status: EventStatus
    dates: EventDates
    location: EventPlace
    capacity: number
    price: number
}

export class HostedEvent {
    constructor(private props: HostedEventProps) {}

    wasOrganizedBy(organizer: Organizer): boolean {
        return this.props.organizer.hasSameIdAs(organizer)
    }

    hasVenueName(name: string): boolean {
        return this.props.location.hasVenueName(name)
    }

    hasOneOfStatus(statuses: EventStatus[]): boolean {
        return statuses.includes(this.props.status)
    }

    hasConflictWith(events: HostedEvent[]): boolean {
        return events.find(event => event.isSimilarTo(this)) !== undefined
    }

    conflictsWithDates(dates: {start: Date, end: Date}): boolean {
        console.log(dates)
        return this.props.dates.conflictsWith(dates)
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

    hasNotEnoughCapacity(): boolean {
        return this.props.capacity < 10
    }

    hasTooMuchCapacity(): boolean {
        return this.props.capacity > 100
    }

    hasNegativePrice(): boolean {
        return this.props.price < 0
    }

    validateOrThrow(): void {
        if (this.props.dates.isInThePast()) {
            throw new Error("Event dates are in the past")
        }
        
        if (this.props.dates.isTooSoon()) {
            throw new Error("Event is too soon")
        }
        
        if (this.props.dates.isTooLong()) {
            throw new Error("Event is too long")
        }

        if (this.hasNotEnoughCapacity()) {
            throw new Error("Event capacity is not enough")
        }

        if (this.hasTooMuchCapacity()) {
            throw new Error("Event capacity is too much")
        }

        if (this.hasNegativePrice()) {
            throw new Error("Event price must be a positive number")
        }
    }
}
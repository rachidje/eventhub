import { Organizer } from "@organizer/domain/organizer.entity"
import stringSimilarity from "string-similarity"
import { EventStatus } from "./enums/event-status"
import { differenceInBusinessDays, differenceInHours } from "date-fns"


export interface HostedEventProps {
    id: string
    name: string
    description: string
    organizer: Organizer
    status: EventStatus
    dates: {
        start: Date,
        end: Date
    }
    venueId: string
    capacity: number
    price: number
}

export class HostedEvent {
    constructor(public props: HostedEventProps) {}

    hasConflictWith(events: HostedEvent[]): boolean {
        return events.find(event => event.isSimilarTo(this)) !== undefined
    }

    conflictsWithDates(dates: {start: Date, end: Date}): boolean {
        return (
            this.props.dates.start < dates.end &&
            dates.start < this.props.dates.end
        )
    }

    isSimilarTo(event: HostedEvent): boolean {
        return this.isTextuallyCloseTo(event)
    }

    private isTextuallyCloseTo(event: HostedEvent): boolean {
        return stringSimilarity.compareTwoStrings(this.props.name, event.props.name) > 0.7 &&
            stringSimilarity.compareTwoStrings(this.props.description, event.props.description) > 0.7
    }

    hasDatesInThePast(): boolean {
        return this.props.dates.start < new Date() || this.props.dates.end < new Date()
    }

    isTooSoon(): boolean {
        return differenceInBusinessDays(this.props.dates.start, new Date()) < 3
    }

    isTooLong(): boolean {
        return differenceInHours(this.props.dates.end, this.props.dates.start) > 2
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
        if (this.hasDatesInThePast()) {
            throw new Error("Event dates are in the past")
        }
        
        if (this.isTooSoon()) {
            throw new Error("Event is too soon")
        }
        
        if (this.isTooLong()) {
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
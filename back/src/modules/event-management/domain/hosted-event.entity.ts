import { combineDateTime } from "@event/application/utils/datetime"
import { differenceInBusinessDays, differenceInHours } from "date-fns"
import { User } from "modules/user-management/domain/user.entity"
import stringSimilarity from "string-similarity"
import { EventStatus } from "./enums/event-status"


export interface HostedEventProps {
    id: string
    name: string
    description: string
    organizer: User
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

    conflictsWithDates(dates: { date: string; startTime: string; endTime: string }): boolean {
        const slotStart = combineDateTime(dates.date, dates.startTime)
        const slotEnd = combineDateTime(dates.date, dates.endTime)
        return slotStart < this.props.dates.end && slotEnd > this.props.dates.start
    }

    isSimilarTo(event: HostedEvent): boolean {
        return this.isTextuallyCloseTo(event) && 
                this.hasSameOrganizer(event) &&
                this.hasSameVenue(event)
    }

    private hasSameVenue(event: HostedEvent): boolean {
        return this.props.venueId === event.props.venueId
    }

    private hasSameOrganizer(event: HostedEvent): boolean {
        return this.props.organizer.props.id === event.props.organizer.props.id
    }

    private isTextuallyCloseTo(event: HostedEvent): boolean {
        return stringSimilarity.compareTwoStrings(this.props.name, event.props.name) > 0.7 &&
            stringSimilarity.compareTwoStrings(this.props.description, event.props.description) > 0.7
    }

    hasDatesInThePast(): boolean {
        return this.props.dates.start < new Date() || this.props.dates.end < new Date()
    }

    hasEndTimeLowerThanStartTime(): boolean {
        return this.props.dates.end < this.props.dates.start
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

        if (this.hasEndTimeLowerThanStartTime()) {
            throw new Error("Event end time is lower than start time")
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
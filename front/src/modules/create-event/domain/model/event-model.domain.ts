export namespace EventModelDomain {
    export type Form = {
        event: EventModel
    }

    export type Venue = {
        id: string
        name: string
    }

    export type EventModel = {
        name: string
        description: string
        date: Date
        startTime: Date
        endTime: Date
        venueName: string
        capacity: number
        price: number
    }
}
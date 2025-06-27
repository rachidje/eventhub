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
        date: string
        startTime: string
        endTime: string
        venueName: string
        capacity: number
        price: number
    }
}
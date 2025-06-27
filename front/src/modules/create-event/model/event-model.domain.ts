export namespace EventModelDomain {
    export type EventModel = {
        name: string
        description: string
        start: Date
        end: Date
        venueName: string
        capacity: number
        price: number
    }
}
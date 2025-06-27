import type { IFetchVenuesRequest } from "./interfaces/fetch-venues.interface";

export class InMemoryFetchVenuesApi implements IFetchVenuesRequest {
    async getVenues() {
        return [
            {
                id: "loc-001",
                name: "La Cité des Sciences",
                address: {
                    street: "30 Avenue de la République",
                    postalCode: "75001",
                    city: "Paris",
                    country: "France"
                },
                weeklySchedule: {
                    tuesday: [{start: "9:00", end: "17:00"}],
                    wednesday: [{start: "9:00", end: "17:00"}],
                    thursday: [{start: "9:00", end: "17:00"}],
                    friday: [{start: "9:00", end: "17:00"}],
                    saturday: [{start: "9:00", end: "17:00"}],
                    sunday: [{start: "9:00", end: "17:00"}]
                }
            },
            {
                id: "loc-002",
                name: "La Cité des Arts",
                address: {
                    street: "30 Avenue des arts",
                    postalCode: "75001",
                    city: "Paris",
                    country: "France"
                },
                weeklySchedule: {
                    monday: [{start: "9:00", end: "17:00"}],
                    tuesday: [{start: "9:00", end: "17:00"}],
                    wednesday: [{start: "9:00", end: "17:00"}],
                    thursday: [{start: "9:00", end: "17:00"}],
                    friday: [{start: "9:00", end: "17:00"}],
                    saturday: [{start: "9:00", end: "17:00"}],
                    sunday: [{start: "9:00", end: "17:00"}]
                }
            }
        ]
    }
}
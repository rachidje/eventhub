// venue/tests/entities-test/unittest-venue.ts

import { Address } from "@venue/domain/value-objects/adress";
import { WeeklySchedule } from "@venue/domain/value-objects/weekly-schedule";
import { Venue } from "@venue/domain/venue.entity";

export const unittestVenue = {
    venue: new Venue({
                    id: "loc-001",
                    name: "La Cité des Sciences",
                    address: new Address({
                        street: "30 Avenue de la République",
                        postalCode: "75001",
                        city: "Paris",
                        country: "France"
                    }),
                    weeklySchedule: WeeklySchedule.from({
                        tuesday: [{start: "9:00", end: "17:00"}],
                        wednesday: [{start: "9:00", end: "17:00"}],
                        thursday: [{start: "9:00", end: "17:00"}],
                        friday: [{start: "9:00", end: "17:00"}],
                        saturday: [{start: "9:00", end: "17:00"}],
                        sunday: [{start: "9:00", end: "17:00"}]
                    })
            }),
    venueOpenAllDays: new Venue({
                    id: "loc-002",
                    name: "La Cité des Arts",
                    address: new Address({
                        street: "30 Avenue des arts",
                        postalCode: "75001",
                        city: "Paris",
                        country: "France"
                    }),
                    weeklySchedule: WeeklySchedule.from({
                        monday: [{start: "9:00", end: "17:00"}],
                        tuesday: [{start: "9:00", end: "17:00"}],
                        wednesday: [{start: "9:00", end: "17:00"}],
                        thursday: [{start: "9:00", end: "17:00"}],
                        friday: [{start: "9:00", end: "17:00"}],
                        saturday: [{start: "9:00", end: "17:00"}],
                        sunday: [{start: "9:00", end: "17:00"}]
                    })
            })
}
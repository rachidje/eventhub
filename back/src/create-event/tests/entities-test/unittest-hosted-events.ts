import { unittestUsers } from "../../../user/tests/entities-test/unittest-users";
import { EventStatus } from "../../domain/enums/event-status";
import { HostedEvent } from "../../domain/hosted-event.entity";
import { EventDate } from "../../domain/value-objects/event-date";
import { EventPlace } from "../../domain/value-objects/event-place";

export const unittestHostedEvents = {
    event1: new HostedEvent({
                    id: "evt-001",
                    name: "Salon de la photo immersive",
                    description: "Un événement artistique autour des technologies immersives et interactives.",
                    schedule: new EventDate({
                        start: new Date("2025-06-14T10:00:00"),
                        end: new Date("2025-06-14T18:00:00")
                    }),
                    location: new EventPlace({
                        name: "La Cité des Sciences",
                        address: "30 Avenue Corentin Cariou",
                        city: "Paris",
                        postalCode: "75019",
                        country: "France",
                        latitude: 48.8967,
                        longitude: 2.3879,
                    }),
                    status: EventStatus.SCHEDULED,
                    organizer: unittestUsers.alice
                })
    ,
    event2: new HostedEvent({
                id: "evt-002",
                name: "Salon photo immersive",
                description: "Événement immersif et artistique sur les technologies interactives de l'image.",
                schedule: new EventDate({
                    start: new Date("2025-06-14T10:00:00"),
                    end: new Date("2025-06-14T18:00:00")
                }),
                location: new EventPlace({
                    name: "La Cité des Sciences",
                    address: "30 Avenue Corentin Cariou",
                    city: "Paris",
                    postalCode: "75019",
                    country: "France",
                    latitude: 48.8967,
                    longitude: 2.3879,
                }),
                status: EventStatus.SCHEDULED,
                organizer: unittestUsers.alice
            })
}
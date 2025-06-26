import { EventStatus } from "@event/domain/enums/event-status";
import { HostedEvent } from "@event/domain/hosted-event.entity";
import { EventDates } from "@event/domain/value-objects/event-dates";
import { EventPlace } from "@event/domain/value-objects/event-place";
import { addDays, addHours } from "date-fns";
import { unittestOrganizers } from "./unittest-organizers";

export const unittestHostedEvents = {
    event: new HostedEvent({
                id: "evt-001",
                name: "Salon de la photo immersive",
                description: "Un événement artistique autour des technologies immersives et interactives.",
                organizer: unittestOrganizers.alice,
                status: EventStatus.PUBLISHED,
                dates: new EventDates({
                    start : addDays(new Date(), 5),
                    end : addDays(addHours(new Date(), 2), 5)
                }),
                location: new EventPlace({
                    name: "La Cité des Sciences",
                    address: "30 Avenue de la République",
                    postalCode: "75001",
                    city: "Paris",
                    country: "France"
                }),
                capacity: 50,
                price: 100
            })
}
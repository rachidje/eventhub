import { EventStatus } from "@event/domain/enums/event-status";
import { HostedEvent } from "@event/domain/hosted-event.entity";
import { addDays, nextSaturday, setHours, setMinutes, setSeconds } from "date-fns";
import { unittestOrganizers } from "./unittest-organizers";
import { unittestVenue } from "./unittest-venue";

const baseDate = nextSaturday(addDays(new Date(), 5))

const start = setSeconds(setMinutes(setHours(baseDate, 10), 0), 0)
const end = setSeconds(setMinutes(setHours(baseDate, 12), 0), 0)

export const unittestHostedEvents = {
    eventWithSimilarData: new HostedEvent({
                id: "evt-001",
                name: "Salon de la photo immersive",
                description: "Un événement artistique autour des technologies immersives et interactives.",
                organizer: unittestOrganizers.alice,
                status: EventStatus.published,
                dates: {start, end},
                venueId: unittestVenue.venue.props.id,
                capacity: 50,
                price: 100
            }),
    event: new HostedEvent({
                id: "evt-002",
                name: "Typescript pour les développeurs",
                description: "Decouvrez les fonctionnalités de TypeScript, son écosystème et ses outils.",
                organizer: unittestOrganizers.alice,
                status: EventStatus.published,
                dates: {start, end},
                venueId: unittestVenue.venue.props.id,
                capacity: 50,
                price: 100
            })
}
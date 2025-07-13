import container from "@api/config/dependency-injection"
import app from "@api/main"
import { unittestVenue } from "@tests/entities-test/unittest-venue"
import { addDays, format, nextSaturday, setHours, setMinutes, setSeconds } from "date-fns"
import request from "supertest"

describe("Create New Event", () => {
    const baseDate = nextSaturday(addDays(new Date(), 5))
    const startDate = setSeconds(setMinutes(setHours(baseDate, 10), 0), 0)
    const endDate = setSeconds(setMinutes(setHours(baseDate, 12), 0), 0)

    beforeEach(async () => {
        await container.resolve('venueRepository').save(unittestVenue.venue)
    })

    it("should return the event ID with status 201" , async () => {
            

        const response = await request(app)
                            .post("/v1/event")
                            .send({
                                name: "Salon de la photo immersive",
                                description: "Un événement artistique autour des technologies immersives et interactives.",
                                date: format(startDate, "yyyy-MM-dd"),
                                startTime: format(startDate, "HH:mm"),
                                endTime: format(endDate, "HH:mm"),
                                venueName: "La Cité des Sciences",
                                capacity: 50,
                                price: 100
                            })
        

        expect(response.status).toEqual(201)
        expect(response.body.success).toEqual(true)
        expect(response.body.data).toEqual(expect.any(String))
    })
})
import { createContainer } from "@api/config/dependency-injection"
import { E2EOrganizers } from "@tests/fixtures/seeds/e2e-users.fixture"
import { E2EVenues } from "@tests/fixtures/seeds/e2e-venues.fixture"
import { TestApp } from "@tests/test-app"
import { addDays, format, nextSaturday, setHours, setMinutes, setSeconds } from "date-fns"
import { Application } from "express"
import request from "supertest"

describe("Create New Event", () => {
    const baseDate = nextSaturday(addDays(new Date(), 5));
    const startDate = setSeconds(setMinutes(setHours(baseDate, 10), 0), 0);
    const endDate = setSeconds(setMinutes(setHours(baseDate, 12), 0), 0);

    let testApp: TestApp;
    let app: Application;

    beforeEach(async () => {
        const container = createContainer()

        testApp = new TestApp(container);
        await testApp.setup();
        app = testApp.getExpressApp();
        
        await testApp.loadFixtures([E2EVenues.venue, E2EOrganizers.alice, E2EOrganizers.john]);
    })

    describe("Scenario: The user is authenticated with a allowed role", () => {
        it("should return the event ID with status 201" , async () => {
            const response = await request(app)
                            .post("/v1/event")
                            .set('Authorization', E2EOrganizers.alice.createJwtToken())
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
    });

    describe("Scenario: The user is authenticated with an unauthorized role", () => {
        it("should return an error with status 403", async () => {
            const response = await request(app)
                            .post("/v1/event")
                            .set('Authorization', E2EOrganizers.john.createJwtToken())
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

            expect(response.status).toEqual(403)
            expect(response.body.success).toEqual(false)
            expect(response.body.error.message).toEqual("Unauthorized")
        });
    });
})
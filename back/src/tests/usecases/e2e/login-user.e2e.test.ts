import { createContainer } from "@api/config/dependency-injection"
import { E2EOrganizers } from "@tests/fixtures/seeds/e2e-users.fixture"
import { TestApp } from "@tests/test-app"
import { Application } from "express"
import request from "supertest"
import { DIContainer } from "types/di-container"

describe("Login User", () => {
    let testApp: TestApp;
    let app: Application;
    let container: DIContainer;

    beforeEach(async () => {
        container = createContainer()

        testApp = new TestApp(container);
        await testApp.setup();
        app = testApp.getExpressApp();

        await testApp.loadFixtures([
            E2EOrganizers.alice
        ])
    })

    it("should return the user ID with status 201" , async () => {
        const response = await request(app)
                        .post("/v1/user/login")
                        .send({
                            email: "alice@example.com",
                            password: "qwerty"
                        })

        expect(response.status).toEqual(200)
        expect(response.body.success).toEqual(true)
        expect(response.body.data.user).toEqual({
            userId: expect.any(String),
            email: 'alice@example.com',
            role: 'organizer'
            })

    })
})
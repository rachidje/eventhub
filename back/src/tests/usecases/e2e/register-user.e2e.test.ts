import { createContainer } from "@api/config/dependency-injection"
import { TestApp } from "@tests/test-app"
import { Role } from "@user/domain/role.enum"
import { Application } from "express"
import request from "supertest"
import { DIContainer } from "types/di-container"

describe("Create New User", () => {
    let testApp: TestApp;
    let app: Application;
    let container: DIContainer;

    beforeEach(async () => {
        container = createContainer()

        testApp = new TestApp(container);
        await testApp.setup();
        app = testApp.getExpressApp();
    })

    it("should return the user ID with status 201" , async () => {
        const response = await request(app)
                        .post("/v1/user/register")
                        .send({
                            firstname: "Alice",
                            lastname: "Smith",
                            email: "alice@example.com",
                            password: "MyP@ssw0rd!",
                            role: "organizer"
                        })

        expect(response.status).toEqual(201)
        expect(response.body.success).toEqual(true)
        expect(response.body.data).toEqual(expect.objectContaining(
            {
                id: expect.any(String),
                email: "alice@example.com",
                role: Role.organizer
            }
        ))

        const user = await container.resolve('userRepository').findByEmail("alice@example.com")
        expect(user).toBeDefined()
        expect(user!.props.role).toEqual(Role.organizer)
    })
})
import "../tests/setup/load-env";
import { errorHandlerMiddleware } from "@api/middlewares/error-handler.middleware";
import { jsonApiResponseMiddleware } from "@api/middlewares/json-response.middleware";
import { createApiRoutes } from "@api/routes";
import cors from "cors";
import express, { Application } from "express";
import { DIContainer } from "types/di-container";
import { IFixture } from "./fixtures/fixture.interface";

export class TestApp {
    private app: Application;

    constructor(private readonly container: DIContainer) {
        this.app = express();
    }

    async setup() {
        await this.resetDatabase();

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(jsonApiResponseMiddleware)
        this.app.use('/', createApiRoutes(this.container));

        this.app.use(errorHandlerMiddleware);
    }

    async loadFixtures(fixtures: IFixture[]) {
        return Promise.all(fixtures.map(fixture => fixture.load(this.container)));
    }

    async resetDatabase() {
        const prisma = this.container.resolve('prisma');
        const tableNames = ['User', 'Venue', 'HostedEvent', 'Calendar', 'Slot'];

        for (const table of tableNames) {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
        }
    }

    getExpressApp() {
        return this.app;
    }
}
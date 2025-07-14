import { createEvent } from "@api/controller/v1/event.controller";
import { Router } from "express";
import { DIContainer } from "types/di-container";

const eventRoutes = (container: DIContainer): Router => {
    const router = Router();
    router.post("/", createEvent(container));
    return router;
};

export default eventRoutes;

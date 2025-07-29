import { createEvent } from "@api/controller/v1/event.controller";
import { authMiddleware } from "@api/middlewares/auth.middleware";
import { Router } from "express";
import { DIContainer } from "types/di-container";

const eventRoutes = (container: DIContainer): Router => {
    const router = Router();
    router.use(authMiddleware(container))
    router.post("/", createEvent(container));
    return router;
};

export default eventRoutes;

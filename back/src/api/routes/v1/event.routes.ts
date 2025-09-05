import { createEvent, diplayAllEvents } from "@api/controller/v1/event.controller";
import { authMiddleware } from "@api/middlewares/auth.middleware";
import { authorizeRolesMiddleware } from "@api/middlewares/authorize-roles.middleware";
import { Role } from "@user/domain/role.enum";
import { Router } from "express";
import { DIContainer } from "types/di-container";

const eventRoutes = (container: DIContainer): Router => {
    const router = Router();
    router.get("/", diplayAllEvents(container));
    
    router.use(authMiddleware(container))
    router.use(authorizeRolesMiddleware(Role.organizer, Role.admin))
    router.post("/", createEvent(container));
    return router;
};

export default eventRoutes;

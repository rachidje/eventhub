import { Router } from "express";
import { DIContainer } from "types/di-container";
import eventRoutes from "./event.routes";
import userRoutes from "./user.routes";

const createV1Routes = (container: DIContainer): Router => {
    const router = Router();
    router.use("/event", eventRoutes(container));
    router.use("/user", userRoutes(container));
    return router;
}

export default createV1Routes;
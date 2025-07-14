import { Router } from "express";
import { DIContainer } from "types/di-container";
import eventRoutes from "./event.routes";

const createV1Routes = (container: DIContainer): Router => {
    const router = Router();
    router.use("/event", eventRoutes(container));
    return router;
}

export default createV1Routes;
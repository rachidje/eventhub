import createV1Routes from "./v1";
import { DIContainer } from "types/di-container";
import { Router } from "express";

export const createApiRoutes = (container: DIContainer): Router => {
    const router = Router();
    router.use("/v1", createV1Routes(container));
    return router;
}

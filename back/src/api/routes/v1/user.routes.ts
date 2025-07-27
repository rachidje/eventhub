import { registerUser } from "@api/controller/v1";
import { Router } from "express";
import { DIContainer } from "types/di-container";

const userRoutes = (container: DIContainer): Router => {
    const router = Router();
    router.post("/register", registerUser(container));
    return router;
};

export default userRoutes;

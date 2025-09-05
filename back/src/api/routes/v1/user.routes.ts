import { loginUser, registerUser } from "@api/controller/v1";
import { authMiddleware } from "@api/middlewares/auth.middleware";
import { Router } from "express";
import { DIContainer } from "types/di-container";

const userRoutes = (container: DIContainer): Router => {
    const router = Router();
    router.post("/register", registerUser(container));
    router.post("/login", loginUser(container));
    
    router.get("/me", authMiddleware, loginUser(container));
    return router;
};

export default userRoutes;

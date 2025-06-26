import { Router } from "express";
import { EventRoutes } from "./event.routes";

const router = Router();

router.use('/event', EventRoutes);

export {router as V1Routes};
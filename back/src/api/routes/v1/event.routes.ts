import { createEvent } from "@api/controller/v1";
import { Router } from "express";

const router = Router();

router.post('/', createEvent)

export {router as EventRoutes};
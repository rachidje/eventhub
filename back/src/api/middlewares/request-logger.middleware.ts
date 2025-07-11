import { logger } from "@api/utils/logger";
import { NextFunction, Request, Response } from "express";

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip} - ${req.get('User-Agent')}`);
    next();
}
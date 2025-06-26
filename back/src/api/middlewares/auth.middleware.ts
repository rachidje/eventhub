import { extractToken } from "@api/utils/extract-token";
import { TokenPayload } from "@shared/application/security/token-payload";
import { NextFunction, Request, Response } from "express";
import container from "../config/dependency-injection";

declare module 'express-serve-static-core' {
    interface Request {
        organizer?: TokenPayload;
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.jsonError('Unauthorized', 403);
    }

    const token = extractToken(authorization);
    if (!token) {
        return res.jsonError('Unauthorized', 403);
    }

    const organizer = await container.resolve('authenticator').authenticate(token);
    if (!organizer) {
        return res.jsonError('Unauthorized', 403);
    }

    req.organizer = {
        organizerId: organizer.props.id,
        email: organizer.props.email
    };
    
    next();
}
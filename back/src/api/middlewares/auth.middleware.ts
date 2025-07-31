import { extractToken } from "@api/utils/extract-token";
import { TokenPayload } from "@shared/application/security/token-payload";
import { Role } from "@user/domain/role.enum";
import { NextFunction, Request, Response } from "express";
import { DIContainer } from "types/di-container";

declare module 'express-serve-static-core' {
    interface Request {
        user?: TokenPayload;
    }
}

export const authMiddleware = (container: DIContainer) => {
    return async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.jsonError('Unauthorized', 403);
        }

        const token = extractToken(authorization);
        if (!token) {
            return res.jsonError('Unauthorized', 403);
        }

        const user = await container.resolve('authenticator').authenticate(token);
        if (!user) {
            return res.jsonError('Unauthorized', 403);
        }

        req.user = {
            userId: user.props.id,
            email: user.props.email,
            roles: user.props.roles.map(role => Role[role])
        };
        
        next();
    }
}
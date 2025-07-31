import { Role } from "@user/domain/role.enum";
import { NextFunction, Request, Response } from "express";

export const authorizeRolesMiddleware = (...allowedRoles: Role[]) => 
    async (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) return res.jsonError('Unauthorized', 403);

        const userRoles = req.user.roles;
        if (!userRoles.some(role => allowedRoles.includes(role))) {
            return res.jsonError('Unauthorized', 403);
        }

        next();
    }
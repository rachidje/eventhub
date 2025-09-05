import { Role } from "@user/domain/role.enum";
import { NextFunction, Request, Response } from "express";

export const authorizeRolesMiddleware = (...allowedRoles: Role[]) => 
    async (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) return res.jsonError('Unauthorized', 403);

        const userRole = req.user.role;
        if (!allowedRoles.some(role => role === userRole)) {
            return res.jsonError('Unauthorized', 403);
        }

        next();
    }
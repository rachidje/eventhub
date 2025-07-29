import { LoginUserDto, RegisterUserDto } from "@api/dto/user.dto";
import { logger } from "@api/utils/logger";
import { RequestValidator } from "@api/utils/validate-request";
import { Role } from "@user/domain/role.enum";
import { NextFunction, Request, Response } from "express";
import { DIContainer } from "types/di-container";

export const registerUser = (container: DIContainer) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<any> => {
        try {
            console.log("register user");
            logger.info(`Register user request received: ${JSON.stringify({...req.body, email: "***", password: "***"})}`);
            const {errors, input} = await RequestValidator(RegisterUserDto, req.body);

            if (errors) {
                return res.jsonError(errors, 400);
            }

            const payload = {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                password: input.password,
                role: input.role as Role
            }

            const result = await container.resolve('registerUserUseCase').execute(payload);

            return res.jsonSuccess(result, 201);
        } catch (error) {
            logger.error(error)
            next(error);
        }
    };
}

export const loginUser = (container: DIContainer) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<any> => {
        try {
            console.log("login user");  
            
            logger.info(`Login user request received: ${JSON.stringify({...req.body, password: "***"})}`);
            const {errors, input} = await RequestValidator(LoginUserDto, req.body);

            if (errors) {
                return res.jsonError(errors, 400);
            }

            const payload = {
                email: input.email,
                password: input.password,
            }

            const result = await container.resolve('loginUserUseCase').execute(payload);

            return res.jsonSuccess(result, 200);
        } catch (error) {
            logger.error(error)
            next(error);
        }
    };
}
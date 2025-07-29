import { CreateEventDto } from "@api/dto/event.dto";
import { logger } from "@api/utils/logger";
import { RequestValidator } from "@api/utils/validate-request";
import { NextFunction, Request, Response } from "express";
import { DIContainer } from "types/di-container";

export const createEvent = (container: DIContainer) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<any> => {
        try {
            console.log(`Create event request received: ${JSON.stringify(req.body)}`);
            
            logger.info(`Create event request received: ${JSON.stringify(req.body)}`);
            const {errors, input} = await RequestValidator(CreateEventDto, req.body);

            if (errors) {
                return res.jsonError(errors, 400);
            }

            const organizer = await container.resolve('userRepository').findByEmail(req.user!.email);

            if (!organizer) {
                return res.jsonError('Unauthorized', 403);
            }

            const eventId = await container.resolve('createEventUseCase').execute({
                ...input,
                organizer
            });

            return res.jsonSuccess(eventId, 201);
        } catch (error) {
            logger.error(error)
            next(error);
        }
    };
}
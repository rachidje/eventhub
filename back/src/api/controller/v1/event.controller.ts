import { CreateEventDto } from "@api/dto/event.dto";
import { logger } from "@api/utils/logger";
import { RequestValidator } from "@api/utils/validate-request";
import { Role } from "@user/domain/role.enum";
import { User } from "@user/domain/user.entity";
import { NextFunction, Request, Response } from "express";
import { DIContainer } from "types/di-container";

export const createEvent = (container: DIContainer) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<any> => {
        try {
            logger.info(`Create event request received: ${JSON.stringify(req.body)}`);
            const {errors, input} = await RequestValidator(CreateEventDto, req.body);

            if (errors) {
                return res.jsonError(errors, 400);
            }

            const payload = {
                name: input.name,
                description: input.description,
                date: input.date,
                startTime: input.startTime,
                endTime: input.endTime,
                venueName: input.venueName,
                capacity: input.capacity,
                price: input.price,
                organizer: new User({
                    id: "usr-001",
                    firstname: "Alice",
                    lastname: "Smith",
                    email: "alice@example.com", 
                    password: "qwerty",
                    roles: [Role.organizer]
                })
            }

            const eventId = await container.resolve('createEventUseCase').execute(payload);

            return res.jsonSuccess(eventId, 201);
        } catch (error) {
            logger.error(error)
            next(error);
        }
    };
}
import container from "@api/config/dependency-injection";
import { CreateEventDto } from "@api/dto/event.dto";
import { logger } from "@api/utils/logger";
import { RequestValidator } from "@api/utils/validate-request";
import { Organizer } from "@organizer/domain/organizer.entity";
import { NextFunction, Request, Response } from "express";

export const createEvent = async (
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
            dates: {
                start: new Date(input.start),
                end: new Date(input.end)
            },
            venueName: input.venueName,
            capacity: input.capacity,
            price: input.price,
            organizer: new Organizer({id: "usr-001", email: "alice@example.com", password: "qwerty"})
        }

        const eventId = await container.resolve('createEventUseCase').execute(payload);

        return res.jsonSuccess(eventId, 201);
    } catch (error) {
        logger.error(error)
        next(error);
    }
};
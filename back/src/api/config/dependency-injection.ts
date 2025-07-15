import { VenueAvailabilityService } from "@calendar/domain/services/venue-availibility.service";
import { IEventConflictCheckerService } from "@event/application/ports/event-conflict-checker-service.interface";
import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { IHostedEventFactory } from "@event/application/ports/hosted-event-factory.interface";
import { ISlotReservationService } from "@event/application/ports/slot-reservation-service.interface";
import { IVenueAvailabilityService } from "@event/application/ports/venue-availability-service.interface";
import { IVenueRepositoryForEvent } from "@event/application/ports/venue-repository-for-event.interface";
import { EventConflictService } from "@event/domain/services/event-conflict-checker.service";
import { asClass, asValue, createContainer as awilixContainer, InjectionMode } from "awilix";

import { IVenueRepositoryForCalendar } from "@calendar/application/ports/venue-repository-for-calendar.interface";
import { SlotReservationService } from "@calendar/domain/services/slot-reservation.service";
import { PostgresCalendarRepository } from "@calendar/infrastructure/repositories/postgres-calendar.repository";
import { CreateEventUseCase } from "@event/application/usecases/create-event.usecase";
import { HostedEventFactory } from "@event/domain/factories/hosted-event.factory";
import { PrismaClient } from "@prisma/client";
import { IAuthenticator } from "@shared/application/ports/authenticator.interface";
import { IIdGenerator } from "@shared/application/ports/id-generator.interface";
import { prismaClient } from "@shared/infrastructure/orm/prisma";
import { UuidGenerator } from "@shared/infrastructure/uuid-generator";
import { JwtAuthenticator } from "@shared/services/jwt-authenticator";
import { InMemoryEventRepository } from "@tests/infra-tests/in-memory-event-repository";
import { PostgresVenueRepository } from "@venue/infrastructure/repositories/postgres-venue.repository";
import { ICalendarRepositoryForEvent } from "modules/event-management/application/ports/calendar-repository-for-event.interface";
import { getEnv } from "./get-env";


const jwtSecret = getEnv('JWT_SECRET');

export interface Dependencies {
    idGenerator: IIdGenerator
    eventRepository: IEventRepository
    venueRepositoryForEvent: IVenueRepositoryForEvent
    venueRepositoryForCalendar: IVenueRepositoryForCalendar
    calendarRepositoryForEvent: ICalendarRepositoryForEvent
    venueAvailabilityService: IVenueAvailabilityService
    eventConflictService: IEventConflictCheckerService
    hostedEventFactory: IHostedEventFactory
    slotReservationService: ISlotReservationService
    authenticator: IAuthenticator
    createEventUseCase: CreateEventUseCase
    jwtSecret: string
    prisma: PrismaClient
}

export const createContainer = () => {
    const container = awilixContainer<Dependencies>({
        injectionMode: InjectionMode.CLASSIC
    }); 

    container.register({
        jwtSecret: asValue(jwtSecret),
        prisma: asValue(prismaClient),
        idGenerator: asClass(UuidGenerator).singleton(),
        eventRepository: asClass(InMemoryEventRepository).singleton(),

        venueRepositoryForEvent: asClass(PostgresVenueRepository).singleton(),
        venueRepositoryForCalendar: asClass(PostgresVenueRepository).singleton(),

        calendarRepositoryForEvent: asClass(PostgresCalendarRepository).singleton(),
        venueAvailabilityService: asClass(VenueAvailabilityService).singleton(),
        eventConflictService: asClass(EventConflictService).singleton(),
        hostedEventFactory: asClass(HostedEventFactory).singleton(),
        slotReservationService: asClass(SlotReservationService).singleton(),
        authenticator: asClass(JwtAuthenticator).singleton(),
        createEventUseCase: asClass(CreateEventUseCase).singleton()
    });

    return container;
}
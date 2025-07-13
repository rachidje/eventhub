import { VenueAvailabilityService } from "@calendar/domain/services/venue-availibility.service";
import { IEventConflictCheckerService } from "@event/application/ports/event-conflict-checker-service.interface";
import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { IHostedEventFactory } from "@event/application/ports/hosted-event-factory.interface";
import { ISlotReservationService } from "@event/application/ports/slot-reservation-service.interface";
import { IVenueAvailabilityService } from "@event/application/ports/venue-availability-service.interface";
import { IVenueRepository } from "@event/application/ports/venue-repository.interface";
import { EventConflictService } from "@event/domain/services/event-conflict-checker.service";
import { asClass, asValue, createContainer, InjectionMode } from "awilix";

import { SlotReservationService } from "@calendar/domain/services/slot-reservation.service";
import { ICalendarRepository } from "@event/application/ports/calendar-repository.interface";
import { CreateEventUseCase } from "@event/application/usecases/create-event.usecase";
import { HostedEventFactory } from "@event/domain/factories/hosted-event.factory";
import { IAuthenticator } from "@shared/application/ports/authenticator.interface";
import { IIdGenerator } from "@shared/application/ports/id-generator.interface";
import { UuidGenerator } from "@shared/infrastructure/uuid-generator";
import { JwtAuthenticator } from "@shared/services/jwt-authenticator";
import { InMemoryCalendarRepository } from "@tests/infra-tests/in-memory-calendar-repository";
import { InMemoryEventRepository } from "@tests/infra-tests/in-memory-event-repository";
import { PostgresVenueRepository } from "@venue/infrastructure/repositories/postgres-venue.repository";
import { getEnv } from "./get-env";


const jwtSecret = getEnv('JWT_SECRET');

export interface Dependencies {
    idGenerator: IIdGenerator
    eventRepository: IEventRepository
    venueRepository: IVenueRepository
    calendarRepository: ICalendarRepository
    venueAvailabilityService: IVenueAvailabilityService
    eventConflictService: IEventConflictCheckerService
    hostedEventFactory: IHostedEventFactory
    slotReservationService: ISlotReservationService
    authenticator: IAuthenticator
    createEventUseCase: CreateEventUseCase
    jwtSecret: string
}

const container = createContainer<Dependencies>({
    injectionMode: InjectionMode.CLASSIC
}); 

container.register({
    jwtSecret: asValue(jwtSecret),
    idGenerator: asClass(UuidGenerator).singleton(),
    eventRepository: asClass(InMemoryEventRepository).singleton(),
    venueRepository: asClass(PostgresVenueRepository).singleton(),
    calendarRepository: asClass(InMemoryCalendarRepository).singleton(),
    venueAvailabilityService: asClass(VenueAvailabilityService).singleton(),
    eventConflictService: asClass(EventConflictService).singleton(),
    hostedEventFactory: asClass(HostedEventFactory).singleton(),
    slotReservationService: asClass(SlotReservationService).singleton(),
    authenticator: asClass(JwtAuthenticator).singleton(),
    createEventUseCase: asClass(CreateEventUseCase).singleton()
});


export default container;
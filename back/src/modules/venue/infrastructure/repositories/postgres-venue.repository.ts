import { Slot } from "@calendar/domain/value-objects/slot";
import { IVenueRepository } from "@event/application/ports/venue-repository.interface";
import { PrismaClient } from "@prisma/client";
import { Address } from "@venue/domain/value-objects/adress";
import { WeeklySchedule } from "@venue/domain/value-objects/weekly-schedule";
import { Venue } from "@venue/domain/venue.entity";

export class PostgresVenueRepository {

}
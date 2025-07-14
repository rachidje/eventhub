import { IVenueRepositoryForCalendar } from "@calendar/application/ports/venue-repository-for-calendar.interface";
import { IVenueRepositoryForEvent } from "@event/application/ports/venue-repository-for-event.interface";
import { PrismaClient } from "@prisma/client";
import { Address } from "@venue/domain/value-objects/adress";
import { WeeklySchedule, WeeklyScheduleProps } from "@venue/domain/value-objects/weekly-schedule";
import { Venue } from "@venue/domain/venue.entity";

export class PostgresVenueRepository implements IVenueRepositoryForCalendar, IVenueRepositoryForEvent {
    constructor(private readonly prisma: PrismaClient) {}

    async save(venue: Venue): Promise<void> {
        await this.prisma.venue.create({
            data: {
                id: venue.props.id,
                name: venue.props.name,
                street: venue.props.address.props.street,
                postalCode: venue.props.address.props.postalCode,
                city: venue.props.address.props.city,
                country: venue.props.address.props.country,
                weeklySchedule: venue.props.weeklySchedule.toJSON()
            }
        })
    }

    async findById(id: string): Promise<Venue | null> {
        const model = await this.prisma.venue.findFirstOrThrow({
            where: {
                id
            }
        })

        return new Venue({
            id: model.id,
            name: model.name,
            address: new Address({
                street: model.street,
                postalCode: model.postalCode,
                city: model.city,
                country: model.country
            }),
            weeklySchedule: WeeklySchedule.from(model.weeklySchedule as WeeklyScheduleProps)
        })
    }

    async findByName(name: string): Promise<Venue> {
        const model = await this.prisma.venue.findFirstOrThrow({
            where: {
                name
            }
        })

        return new Venue({
            id: model.id,
            name: model.name,
            address: new Address({
                street: model.street,
                postalCode: model.postalCode,
                city: model.city,
                country: model.country
            }),
            weeklySchedule: WeeklySchedule.from(model.weeklySchedule as WeeklyScheduleProps)
        })
    }
}
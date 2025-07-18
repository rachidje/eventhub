import { IEventRepositoryForCalendar } from "@calendar/application/ports/event-repository-for-calendar.interface";
import { IEventRepository } from "@event/application/ports/event-repository.interface";
import { EventStatus } from "@event/domain/enums/event-status";
import { HostedEvent } from "@event/domain/hosted-event.entity";
import { Prisma, PrismaClient } from "@prisma/client";
import { Role } from "@user/domain/role.enum";
import { User } from "@user/domain/user.entity";

// Type guard
function isRootClient(
    client: PrismaClient | Prisma.TransactionClient
): client is PrismaClient {
    return "transaction" in client || "$transaction" in client
}

export class PostgresEventRepository implements IEventRepository, IEventRepositoryForCalendar {
    constructor(
        private readonly prisma: PrismaClient | Prisma.TransactionClient
    ) {}

    async save(event: HostedEvent): Promise<void> {
        await this.prisma.hostedEvent.create({
            data: {
                id: event.props.id,
                name: event.props.name,
                description: event.props.description,
                startDate: event.props.dates.start,
                endDate: event.props.dates.end,
                capacity: event.props.capacity,
                price: event.props.price,
                organizerId: event.props.organizer.props.id,
                venueId: event.props.venueId
            }
        })
    }

    async findById(id: string): Promise<HostedEvent | null> {
        const model = await this.prisma.hostedEvent.findUnique({
            where: { id },
            include: {
                organizer: true
            }
        })

        if (!model) return null

        return new HostedEvent({
            id: model.id,
            name: model.name,
            description: model.description,
            dates: {
                start: model.startDate,
                end: model.endDate
            },
            capacity: model.capacity,
            price: model.price,
            venueId: model.venueId,
            status: model.status as EventStatus,
            organizer: new User({
                id: model.organizer.id,
                email: model.organizer.email,
                password: model.organizer.password,
                firstname: model.organizer.firstname,
                lastname: model.organizer.lastname,
                roles: model.organizer.roles as Role[]
            })
        })
    }

    async findByOrganizerAndStatus(organizerId: string, statuses: EventStatus[]): Promise<HostedEvent[]> {
        const models = await this.prisma.hostedEvent.findMany({
            where: {
                organizerId,
                status: {
                    in: statuses
                }
            },
            include: {
                organizer: true
            }
        })

        return models.map(model => new HostedEvent({
            id: model.id,
            name: model.name,
            description: model.description,
            dates: {
                start: model.startDate,
                end: model.endDate
            },
            capacity: model.capacity,
            price: model.price,
            venueId: model.venueId,
            status: model.status as EventStatus,
            organizer: new User({
                id: model.organizer.id,
                email: model.organizer.email,
                password: model.organizer.password,
                firstname: model.organizer.firstname,
                lastname: model.organizer.lastname,
                roles: model.organizer.roles as Role[]
            })
        }))
    }

    async findEventsAtVenue(venueId: string): Promise<HostedEvent[]> {
        const models = await this.prisma.hostedEvent.findMany({
            where: {
                venueId
            },
            include: {
                organizer: true
            }
        })

        return models.map(model => new HostedEvent({
            id: model.id,
            name: model.name,
            description: model.description,
            dates: {
                start: model.startDate,
                end: model.endDate
            },
            capacity: model.capacity,
            price: model.price,
            venueId: model.venueId,
            status: model.status as EventStatus,
            organizer: new User({
                id: model.organizer.id,
                email: model.organizer.email,
                password: model.organizer.password,
                firstname: model.organizer.firstname,
                lastname: model.organizer.lastname,
                roles: model.organizer.roles as Role[]
            })
        }))
    }

    async runInTransaction<T>(fn: (repository: IEventRepository) => Promise<T>): Promise<T> {
        if (!isRootClient(this.prisma)) {
            throw new Error("Cannot start transaction from within a transaction")
        }

        return this.prisma.$transaction(async (tx) => {
            const txRepo = new PostgresEventRepository(tx)
            return fn(txRepo)
        })
    }
}
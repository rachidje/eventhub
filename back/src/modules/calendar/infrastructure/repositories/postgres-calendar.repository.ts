import { ICalendarRepository } from "@calendar/application/ports/calendar-repository.interface"
import { Calendar } from "@calendar/domain/calendar.entity"
import { Slot } from "@calendar/domain/value-objects/slot"
import { ICalendarRepositoryForEvent } from "@event/application/ports/calendar-repository-for-event.interface"
import { combineDateTime } from "@event/application/utils/datetime"
import { PrismaClient, Slot as SlotModel } from "@prisma/client"
import { format } from "date-fns"

export class PostgresCalendarRepository implements ICalendarRepository, ICalendarRepositoryForEvent {
    constructor(private readonly prisma: PrismaClient) {}

    async findByVenueId(venueId: string): Promise<Calendar | null> {
        const calendarModel = await this.prisma.calendar.findUnique({
            where: { venueId },
            include: { slots: true }
        })

        if (!calendarModel) return null

        const slots = calendarModel.slots.map((slot: SlotModel) =>
            new Slot({
                date: slot.date.toISOString().slice(0, 10), // "yyyy-MM-dd"
                startTime: format(slot.startTime, "HH:mm"),
                endTime: format(slot.endTime, "HH:mm"),
                venueId: calendarModel.venueId
            })
        )

        return new Calendar(venueId, slots)
    }

    async save(calendar: Calendar): Promise<void> {
        // Vérifie s'il existe déjà un Calendar pour ce venueId
        const existing = await this.prisma.calendar.findUnique({
            where: { venueId: calendar.venueId }
        })

        // Création ou récupération du calendar
        const calendarId = existing
        ? existing.id
        : (
            await this.prisma.calendar.create({
                data: { venueId: calendar.venueId }
            })
        ).id

        const slots = calendar.getSlots()

        if (slots.length === 0) return

        await this.prisma.slot.createMany({
            data: slots.map(slot => ({
                calendarId,
                date: new Date(slot.props.date),
                startTime: combineDateTime(slot.props.date, slot.props.startTime),
                endTime: combineDateTime(slot.props.date, slot.props.endTime),
                isBooked: true
            })),
            skipDuplicates: true
        })
    }
}

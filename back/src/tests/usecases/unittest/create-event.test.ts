import { SlotReservationService } from "@calendar/domain/services/slot-reservation.service"
import { VenueAvailabilityService } from "@calendar/domain/services/venue-availibility.service"
import { Slot } from "@calendar/domain/value-objects/slot"
import { CreateEventUseCase } from "@event/application/usecases/create-event.usecase"
import { EventStatus } from "@event/domain/enums/event-status"
import { HostedEventFactory } from "@event/domain/factories/hosted-event.factory"
import { EventConflictService } from "@event/domain/services/event-conflict-checker.service"
import { UuidGenerator } from "@shared/infrastructure/uuid-generator"
import { addDays, addHours, format, nextDay, nextMonday, nextSaturday, previousDay, setHours, setMinutes, setSeconds } from "date-fns"
import { unittestHostedEvents } from "../../entities-test/unittest-hosted-events"
import { unittestOrganizers } from "../../entities-test/unittest-organizers"
import { unittestVenue } from "../../entities-test/unittest-venue"
import { InMemoryCalendarRepository } from "../../infra-tests/in-memory-calendar-repository"
import { InMemoryEventRepository } from "../../infra-tests/in-memory-event-repository"
import { InMemoryVenueRepository } from "../../infra-tests/in-memory-venue-repository"
import { combineDateTime } from "@event/application/utils/datetime"

describe("Create New Event", () => {

    const baseDate = nextSaturday(addDays(new Date(), 5))
    
    const startDate = setSeconds(setMinutes(setHours(baseDate, 10), 0), 0)
    const endDate = setSeconds(setMinutes(setHours(baseDate, 12), 0), 0)

    const payload = {
            name: "Salon de la photo immersive",
            description: "Un événement artistique autour des technologies immersives et interactives.",
            organizer: unittestOrganizers.alice,
            status: EventStatus.SCHEDULED,
            date: format(startDate, "yyyy-MM-dd"),
            startTime: format(startDate, "HH:mm"),
            endTime: format(endDate, "HH:mm"),
            venueName: unittestVenue.venue.props.name,
            capacity: 50,
            price: 100
    }

    let eventRepository: InMemoryEventRepository
    let venueRepository: InMemoryVenueRepository
    let calendarRepository: InMemoryCalendarRepository
    let venueAvailabilityService: VenueAvailabilityService
    let usecase: CreateEventUseCase
    let idGenerator: UuidGenerator
    let eventConflictService: EventConflictService
    let hostedEventFactory: HostedEventFactory
    let slotReservationService: SlotReservationService

    beforeEach(async () => {
        eventRepository = new InMemoryEventRepository()
        venueRepository = new InMemoryVenueRepository()
        calendarRepository = new InMemoryCalendarRepository()
        slotReservationService = new SlotReservationService(calendarRepository)
        idGenerator = new UuidGenerator()
        hostedEventFactory = new HostedEventFactory(idGenerator)
        eventConflictService = new EventConflictService(eventRepository)

        await venueRepository.save(unittestVenue.venue)
        
        venueAvailabilityService = new VenueAvailabilityService(venueRepository, eventRepository)

        usecase = new CreateEventUseCase(
            eventRepository, 
            venueRepository, 
            venueAvailabilityService, 
            eventConflictService, 
            hostedEventFactory, 
            slotReservationService
        )
    })

    describe("Scenario : The event already exists with the same data", () => {
        const invalidPayload = {
            ...payload,
            name: "Salon de la photo",
            description: "Un événement autour des technologies immersives et interactives."
        }
        it("should throw an error" , async () => {
            await eventRepository.save(unittestHostedEvents.eventWithSimilarData)
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Already event exists with the same data")

        })
    })

    describe("Scenario : The event's dates are in the past", () => {
        const baseDate = previousDay(new Date(), 1)

        const startDate = setSeconds(setMinutes(setHours(baseDate, 10), 0), 0)
        const endDate = setSeconds(setMinutes(setHours(baseDate, 12), 0), 0)

        const invalidPayload = {
            ...payload,
            venueName: unittestVenue.venueOpenAllDays.props.name,
            date: format(startDate, "yyyy-MM-dd"),
            startTime: format(startDate, "HH:mm"),
            endTime: format(endDate, "HH:mm")
        }

        it("should throw an error" , async () => {
            await venueRepository.save(unittestVenue.venueOpenAllDays)
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event dates are in the past")
        })
    })

    describe("Scenario : The event is too soon", () => {
        const baseDate = nextDay(new Date(), 1)
    
        const startDate = setSeconds(setMinutes(setHours(baseDate, 10), 0), 0)
        const endDate = setSeconds(setMinutes(setHours(baseDate, 12), 0), 0)

        const invalidPayload = {
            ...payload,
            venueName: unittestVenue.venueOpenAllDays.props.name,
            date: format(startDate, "yyyy-MM-dd"),
            startTime: format(startDate, "HH:mm"),
            endTime: format(endDate, "HH:mm")
        }
        it("should throw an error" , async () => {
            await venueRepository.save(unittestVenue.venueOpenAllDays)
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event is too soon")
        })
    })

    describe("Scenario : The event is too long", () => {
        const invalidPayload = {
            ...payload,
            endTime: format(setSeconds(setMinutes(setHours(baseDate, 15), 0), 0), "HH:mm")
        }
        it("should throw an error" , async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event is too long")
        })
    })

    describe("Scenario : The event's capacity is not enough", () => {
        const invalidPayload = {
            ...payload,
            capacity: 1
        }
        it("should throw an error" , async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event capacity is not enough")
        })
    })

    describe("Scenario : The event's capacity is too much", () => {
        const invalidPayload = {
            ...payload,
            capacity: 101
        }
        it("should throw an error" , async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event capacity is too much")
        })
    })

    describe("Scenario: The event's dates are not in opening hours of the place", () => {
        
        it("should throw an error" , async () => {
            const startDate = nextMonday(addDays(new Date(), 5))
            const endDate = addHours(startDate, 2)

            const invalidPayload = {
                ...payload,
                date: format(startDate, "yyyy-MM-dd"),
                startTime: format(startDate, "HH:mm"),
                endTime: format(endDate, "HH:mm")
            }
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event dates are not in opening hours of the place")
        })
    })

    describe("Scenario: The slot is not available", () => {
        const bookedSlot = new Slot({
                start: startDate,
                end: endDate,
                venueId: unittestVenue.venue.props.id
            })

        it("should throw an error" , async () => {
            await calendarRepository.save(bookedSlot)
            await eventRepository.save(unittestHostedEvents.event)
            await expect(usecase.execute(payload)).rejects.toThrow("Slot is not available")
        })
    })

    describe("Scenario: Negative price", () => {
        const invalidPayload = {
            ...payload,
            price: -1
        }
        it("should throw an error" , async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event price must be a positive number")
        })
    })

    describe("Scenario: Booking the place", () => {
        it("should book the place" , async () => {
            await usecase.execute(payload)

            const slot = await calendarRepository.findByVenueId(unittestVenue.venue.props.id)
            expect(slot).toBeDefined()
            const expectedStart = combineDateTime(payload.date, payload.startTime)
            const expectedEnd = combineDateTime(payload.date, payload.endTime)

            expect(slot!.props.start.getTime()).toBe(expectedStart.getTime())
            expect(slot!.props.end.getTime()).toBe(expectedEnd.getTime())

        })
    })

    describe("Scenario: Save the event and return ID", () => {
        it("should return the event ID" , async () => {
            const eventId = await usecase.execute(payload)
            expect(eventId).toEqual(expect.any(String))

            const event = await eventRepository.findById(eventId)
            expect(event).toBeDefined()
            expect(event!.props.name).toEqual(payload.name)
            expect(event!.props.description).toEqual(payload.description)

        })
    })
})
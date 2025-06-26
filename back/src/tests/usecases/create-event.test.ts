import { addDays, addHours, set } from "date-fns"
import { EventStatus } from "@event/domain/enums/event-status"
import { Slot } from "@calendar/domain/value-objects/slot"
import { unittestVenue } from "../entities-test/unittest-venue"
import { unittestOrganizers } from "../entities-test/unittest-organizers"
import { InMemoryEventRepository } from "../infra-tests/in-memory-event-repository"
import { VenueAvailabilityService } from "@calendar/domain/services/venue-availibility.service"
import { unittestHostedEvents } from "../entities-test/unittest-hosted-events"
import { CreateEventUseCase } from "@event/application/usecases/create-event.usecase"
import { InMemoryVenueRepository } from "../infra-tests/in-memory-venue-repository"
import { InMemoryCalendarRepository } from "../infra-tests/in-memory-calendar-repository"

describe("Create New Event", () => {
    function nextDayAt(targetDay: number, hour: number, minute: number = 0): Date {
        /**
         * Fonction qui retourne le prochain jour specifique après la date courante.
         */
        const today = addDays(new Date(), 5)
        const currentDay = today.getDay()
        const delta = (targetDay - currentDay + 7) % 7 || 7

        const targetDate = addDays(today, delta)
        return set(targetDate, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 })
    }

    function nextMondayAt(hour: number, minute: number = 0): Date {
        return nextDayAt(1, hour, minute)
    }

    function nextSaturdayAt(hour: number, minute: number = 0): Date {
        return nextDayAt(6, hour, minute)
    }

    const startDate = nextSaturdayAt(10)
    const endDate = nextSaturdayAt(12)

    const bookedSlot = new Slot({
        start: nextSaturdayAt(10),
        end: nextSaturdayAt(12),
        venueId: unittestVenue.venue.venueId()
    })

    const payload = {
            name: "Salon de la photo immersive",
            description: "Un événement artistique autour des technologies immersives et interactives.",
            organizer: unittestOrganizers.alice,
            status: EventStatus.SCHEDULED,
            dates: {
                start: startDate,
                end: endDate
            },
            location : {
                name: "La Cité des Sciences",
                address: "30 Avenue de la République",
                postalCode: "75001",
                city: "Paris",
                country: "France"
            },
            capacity: 50,
            price: 100
        }

    let eventRepository: InMemoryEventRepository
    let venueRepository: InMemoryVenueRepository
    let calendarRepository: InMemoryCalendarRepository
    let venueAvailabilityService: VenueAvailabilityService
    let usecase: CreateEventUseCase

    beforeEach(async () => {
        eventRepository = new InMemoryEventRepository()
        venueRepository = new InMemoryVenueRepository()
        calendarRepository = new InMemoryCalendarRepository()

        await venueRepository.save(unittestVenue.venue)
        calendarRepository = new InMemoryCalendarRepository()
        
        venueAvailabilityService = new VenueAvailabilityService(venueRepository, eventRepository)


        usecase = new CreateEventUseCase(eventRepository, venueRepository, venueAvailabilityService, calendarRepository)
    })

    describe("Scenario : The event already exists with the same data", () => {
        it("should throw an error" , async () => {
            await eventRepository.save(unittestHostedEvents.event)
            await expect(usecase.execute(payload)).rejects.toThrow("Event with same data already exists")
        })
    })

    describe("Scenario : The event's dates are in the past", () => {
        const invalidPayload = {
            ...payload,
            dates: {
                start: addDays(new Date(), -1),
                end: addDays(new Date(), -1)
            }
        }

        it("should throw an error" , async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event dates are in the past")
        })
    })

    describe("Scenario : The event is too soon", () => {
        const invalidPayload = {
            ...payload,
            dates: {
                start: addDays(new Date(), 2),
                end: addDays(new Date(), 2)
            }
        }

        it("should throw an error" , async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event is too soon")
        })
    })

    describe("Scenario : The event is too long", () => {
        const invalidPayload = {
            ...payload,
            dates: {
                start: addDays(new Date(), 5),
                end: addDays(addHours(new Date(), 4), 5)
            }
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
            const monday7am = nextMondayAt(7)
            const monday9am = new Date(monday7am.getTime())
            monday9am.setHours(9)
            
            const invalidPayload = {
                ...payload,
                dates: {
                    start: monday7am,
                    end: monday9am
                }
            }

            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event dates are not in opening hours of the venue")
        })

        it('should throw an error for an opening slot out of opening hours', async () => {
            const saturday7am = nextSaturdayAt(7)
            const saturday9am = new Date(saturday7am.getTime())
            saturday9am.setHours(9)

            const invalidPayload = {
                ...payload,
                dates: {
                    start: saturday7am,
                    end: saturday9am
                }
            }

            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event dates are not in opening hours of the venue")
        })
    })

    describe.only("Scenario: The slot is not available", () => {
        const invalidPayload = {
                ...payload,
                dates: {
                    start: nextSaturdayAt(10),
                    end: nextSaturdayAt(12)
                }
            }

        it("should throw an error" , async () => {
            await calendarRepository.save(bookedSlot)
            await eventRepository.save(unittestHostedEvents.event)
            console.log(calendarRepository.slots)
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("The slot is not available")
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
            const book = await calendarRepository.findById(bookedSlot.id())
            
            expect(book).toBeDefined()
        })
    })
})
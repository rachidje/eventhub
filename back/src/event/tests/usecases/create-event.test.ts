import { addDays, addHours, set } from "date-fns"
import { unittestUsers } from "../../../user/tests/entities-test/unittest-users"
import { Address } from "../../../venue/domain/value-objects/adress"
import { WeeklySchedule } from "../../../venue/domain/value-objects/weekly-schedule"
import { Venue } from "../../../venue/domain/venue.entity"
import { CreateEventUseCase } from "../../application/usecases/create-event.usecase"
import { EventStatus } from "../../domain/enums/event-status"
import { unittestHostedEvents } from "../entities-test/unittest-hosted-events"
import { InMemoryEventRepository } from "../infra-test/in-memory-event-repository"
import { InMemoryVenueRepository } from "../../../venue/tests/infra-test/in-memory-venue-repository"
import { unittestVenue } from "../../../venue/tests/enitities-test/unittest-venue"

describe("Create New Event", () => {
    function nextDayAt(targetDay: number, hour: number, minute: number = 0): Date {
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

    const startDate = addDays(new Date(), 5)
    const endDate = addDays(addHours(new Date(), 2), 5)

    const payload = {
            name: "Salon de la photo immersive",
            description: "Un événement artistique autour des technologies immersives et interactives.",
            organizer: unittestUsers.alice,
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
            capacity: 50
        }

    let repository: InMemoryEventRepository
    let venueRepository: InMemoryVenueRepository
    let usecase: CreateEventUseCase

    beforeEach(async () => {
        repository = new InMemoryEventRepository()
        venueRepository = new InMemoryVenueRepository()
        usecase = new CreateEventUseCase(repository, venueRepository)
    })

    describe("Scenario : The event already exists with the same data", () => {
        it("should throw an error" , async () => {
            await repository.save(unittestHostedEvents.event)
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
            await venueRepository.save(unittestVenue.venue)
            const usecase = new CreateEventUseCase(repository, venueRepository);

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
            await venueRepository.save(unittestVenue.venue)
            const usecase = new CreateEventUseCase(repository, venueRepository);

            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Event dates are not in opening hours of the venue")
        })
    })
})
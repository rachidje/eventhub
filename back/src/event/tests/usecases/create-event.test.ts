import { addDays, addHours } from "date-fns"
import { unittestUsers } from "../../../user/tests/entities-test/unittest-users"
import { CreateEventUseCase } from "../../application/usecases/create-event.usecase"
import { EventStatus } from "../../domain/enums/event-status"
import { unittestHostedEvents } from "../entities-test/unittest-hosted-events"
import { InMemoryEventRepository } from "../infra-test/in-memory-event-repository"

describe("Create New Event", () => {
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
    let usecase: CreateEventUseCase

    beforeEach(async () => {
        repository = new InMemoryEventRepository()
        usecase = new CreateEventUseCase(repository)
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
})
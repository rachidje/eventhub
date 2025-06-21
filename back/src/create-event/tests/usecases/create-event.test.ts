import { addDays } from "date-fns"
import { unittestUsers } from "../../../user/tests/entities-test/unittest-users"
import { CreateEventUseCase } from "../../application/usecases/create-event"
import { EventStatus } from "../../domain/enums/event-status"
import { unittestHostedEvents } from "../entities-test/unittest-hosted-events"
import { InMemoryEventRepository } from "../infra-test/in-memory-event-repository"

describe("Create New Event", () => {
    const payload = {
            name: "Salon de la photo immersive",
            description: "Un événement artistique autour des technologies immersives et interactives.",
            organizer: unittestUsers.alice,
            status: EventStatus.SCHEDULED,
            dates: {
                start: new Date("2025-10-01T00:00:00.000Z"),
                end: new Date("2025-10-01T02:00:00.000Z")
            },
            location : {
                name: "La Cité des Sciences",
                address: "30 Avenue de la République",
                postalCode: "75001",
                city: "Paris",
                country: "France"
            }
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
})
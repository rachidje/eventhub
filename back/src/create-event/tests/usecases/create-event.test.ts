import { unittestUsers } from "../../../user/tests/entities-test/unittest-users"
import { CreateEventUseCase } from "../../application/usecases/create-event"
import { EventStatus } from "../../domain/enums/event-status"
import { HostedEvent } from "../../domain/hosted-event.entity"
import { InMemoryEventRepository } from "../infra-test/in-memory-event-repository"

describe("Create New Event", () => {

    describe("Scenario : The event already exists with the same data", () => {
        const payload = {
            name: "Salon de la photo immersive",
            description: "Un événement artistique autour des technologies immersives et interactives.",
            organizer: unittestUsers.alice,
            status: EventStatus.SCHEDULED,
        }
        it("should throw an error" , async () => {
            const repository = new InMemoryEventRepository()
            const usecase = new CreateEventUseCase(repository)

            const event = new HostedEvent({
                id: "evt-001",
                name: "Salon de la photo immersive",
                description: "Un événement artistique autour des technologies immersives et interactives.",
                organizer: unittestUsers.alice,
                status: EventStatus.PUBLISHED
            })

            await repository.save(event)
            await expect(usecase.execute(payload)).rejects.toThrow("Event with same data already exists")
        })
    })
})
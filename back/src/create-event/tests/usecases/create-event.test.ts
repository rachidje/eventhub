import { unittestUsers } from "../../../user/tests/entities-test/unittest-users"
import { CreateEventUseCase } from "../../application/usecases/create-event"
import { unittestHostedEvents } from "../entities-test/unittest-hosted-events"
import { InMemoryEventRepository } from "../infra-test/in-memory-event-repository"

describe("Create New Event", () => {

    describe("Scenario : The event already exists with the same data", () => {
        const payload = {
            event: unittestHostedEvents.event1,
            user: unittestUsers.alice
        }
        it("should throw an error" , async () => {
            const repository = new InMemoryEventRepository()
            const usecase = new CreateEventUseCase(repository)
            await repository.save(unittestHostedEvents.event1)
            await expect(usecase.execute(payload)).rejects.toThrow("Event with same data already exists")
        })
    })
})
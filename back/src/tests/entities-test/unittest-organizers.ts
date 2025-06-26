import { Organizer } from "@organizer/domain/organizer.entity";

export const unittestOrganizers = {
    alice: new Organizer({
        id: "usr-001",
        email: "alice@example.com",
        password: "qwerty"
    }),
    john: new Organizer({
        id: "usr-002",
        email: "john@example.com",
        password: "qwerty"
    })
}
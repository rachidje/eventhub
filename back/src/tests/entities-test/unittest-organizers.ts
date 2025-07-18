import { Role } from "@user/domain/role.enum";
import { User } from "@user/domain/user.entity";

export const unittestOrganizers = {
    alice: new User({
        id: "usr-001",
        firstname: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
        password: "qwerty",
        roles: [Role.organizer]
    }),
    john: new User({
        id: "usr-002",
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: "qwerty",
        roles: [Role.organizer]
    })
}
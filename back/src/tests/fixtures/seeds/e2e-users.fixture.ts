import { User } from "@user/domain/user.entity";
import { UserFixture } from "../user-fixture";
import { Role } from "@user/domain/role.enum";

export const E2EOrganizers = {
    alice: new UserFixture(
        new User({
            id: "usr-001",
            email: "alice@example.com",
            password: "qwerty",
            firstname: "Alice",
            lastname: "Smith",
            roles: [Role.organizer]
        })
    ),
    john: new UserFixture(
        new User({
            id: "usr-002",
            email: "john@example.com",
            password: "qwerty",
            firstname: "John",
            lastname: "Doe",
            roles: [Role.participant]
        })
    )
}
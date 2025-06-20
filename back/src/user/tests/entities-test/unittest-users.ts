import { User } from "../../domain/user.entity";

export const unittestUsers = {
    alice: new User({
        id: "usr-001",
    }),
    john: new User({
        id: "usr-002",
    })
}
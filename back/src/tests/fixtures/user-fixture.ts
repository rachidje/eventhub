import { User } from "@user/domain/user.entity";
import { IFixture } from "./fixture.interface";
import { DIContainer } from "types/di-container";

export class UserFixture implements IFixture {
    constructor(private readonly user: User) {}

    async load(container: DIContainer): Promise<void> {
        await container.resolve('userRepository').save(this.user);
    }
}
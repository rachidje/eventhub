import { User } from "@user/domain/user.entity";
import { IFixture } from "./fixture.interface";
import { DIContainer } from "types/di-container";
import jwt from 'jsonwebtoken';


export class UserFixture implements IFixture {
    constructor(public readonly user: User) {}

    async load(container: DIContainer): Promise<void> {
        await this.hashPassword(container);
        await container.resolve('userRepository').save(this.user);
    }

    async hashPassword(container: DIContainer): Promise<void> {
        const passwordHasher = container.resolve('passwordHasher');
        this.user.props.password = await passwordHasher.hash(this.user.props.password);
    }

    createJwtToken(): string {
        const payload = {
            userId: this.user.props.id,
            email: this.user.props.email,
            roles: this.user.props.roles
        };

        const secret = process.env.JWT_SECRET;
        return `Bearer ${jwt.sign(payload, secret!)}`;
    }
}
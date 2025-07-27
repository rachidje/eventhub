import { IUserRepository } from "@user/application/ports/user-repository.interface";
import { User } from "@user/domain/user.entity";

export class InMemoryUserRepository implements IUserRepository {
    constructor(private users: User[] = []) {}

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(u => u.props.email === email) || null
    }
}
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@user/application/ports/user-repository.interface";
import { User } from "@user/domain/user.entity";

export class PostgresUserRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async save(user: User): Promise<void> {
        await this.prisma.user.create({ data: user.props });
    }
}
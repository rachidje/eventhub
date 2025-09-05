import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@user/application/ports/user-repository.interface";
import { Role } from "@user/domain/role.enum";
import { User } from "@user/domain/user.entity";

export class PostgresUserRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async save(user: User): Promise<void> {
        await this.prisma.user.create({ data: user.props });
    }

    async findByEmail(email: string): Promise<User | null> {
        const model = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!model) {
            return null
        }

        return new User({
            id: model.id,
            firstname: model.firstname,
            lastname: model.lastname,
            email: model.email,
            password: model.password,
            role: model.role as Role,
        })
    }
}
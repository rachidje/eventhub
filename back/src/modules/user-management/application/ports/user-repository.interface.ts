import { User } from "@user/domain/user.entity";

export interface IUserRepository {
    save(user: User): Promise<void>;
}
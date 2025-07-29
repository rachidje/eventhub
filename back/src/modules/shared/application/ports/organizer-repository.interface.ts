import { User } from "@user/domain/user.entity";

export interface IOrganizerRepository {
    save(organizer: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
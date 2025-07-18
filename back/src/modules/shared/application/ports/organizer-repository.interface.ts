import { User } from "@user/domain/user.entity";

export interface IOrganizerRepository {
    findByEmail(email: string): Promise<User | null>;
    save(organizer: User): Promise<void>;
}
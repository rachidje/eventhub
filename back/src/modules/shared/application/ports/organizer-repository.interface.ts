import { Organizer } from "@organizer/domain/organizer.entity";

export interface IOrganizerRepository {
    findByEmail(email: string): Promise<Organizer | null>;
    save(organizer: Organizer): Promise<void>;
}
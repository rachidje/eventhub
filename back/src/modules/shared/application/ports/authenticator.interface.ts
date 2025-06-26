import { Organizer } from "@organizer/domain/organizer.entity";

export interface IAuthenticator {
    authenticate(token: string): Promise<Organizer>;
}
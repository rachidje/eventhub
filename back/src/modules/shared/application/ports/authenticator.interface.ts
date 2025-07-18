import { Organizer } from "modules/user-management/domain/user.entity";

export interface IAuthenticator {
    authenticate(token: string): Promise<Organizer>;
}
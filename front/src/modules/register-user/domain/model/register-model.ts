export namespace RegisterModel {
    export type Role = "organizer" | "participant" | null;

    export type Form = {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        role: Role;
    }

    export type TokenPayload = {
        userId: string;
        email: string;
        roles: Role[];
    }
}
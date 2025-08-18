export namespace AuthModel {
    export type Role = "organizer" | "participant" | null;

    export type LoginForm = {
        email: string;
        password: string;
    }

    export type TokenPayload = {
        userId: string;
        email: string;
        token: string;
        roles: Role[];
    }
}
export namespace AuthModel {
    export type Role = "organizer" | "participant" | null;

    export type LoginForm = {
        email: string;
        password: string;
    }

    export type User = {
        userId: string;
        email: string;
        role: Role
    }

    export type TokenPayload = {
        userId: string;
        email: string;
        token: string;
        role: Role;
    }
}
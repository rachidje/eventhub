import { Role } from "@user/domain/role.enum";

export interface TokenPayload {
    userId: string;
    email: string;
    role: Role;
}
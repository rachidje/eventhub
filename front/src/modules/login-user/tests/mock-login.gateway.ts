import type { ILoginGateway } from "../api/interfaces/login-gateway.interface";

export class MockLoginGateway implements ILoginGateway {
    async login(payload: any): Promise<any> {
        return {
            userId: "string",
            email: "string",
            token: "string",
            role: "organizer"
        }
    }
}
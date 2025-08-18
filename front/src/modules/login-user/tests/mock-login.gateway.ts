import type { ILoginGateway } from "../api/interfaces/login-gateway.interface";

export class MockLoginGateway implements ILoginGateway {
    async token(payload: any): Promise<any> {
        return {
            userId: "string",
            email: "string",
            token: "string",
            roles: ["organizer"]
        }
    }
}
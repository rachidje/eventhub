import type { RegisterUserDto } from "../api/dto/register-user.dto";
import type { IRegisterGateway, RegisterGatewayResponse } from "../api/interfaces/register-gateway.interface";
import type { RegisterModel } from "../domain/model/register-model";

export class MockRegisterGateway implements IRegisterGateway {
    private registerCallData: RegisterUserDto | null = null;

    async register(payload: RegisterModel.Form): Promise<RegisterGatewayResponse> {
        this.registerCallData = payload;
        return {
            id: "123456789",
            email: "test@test.com",
            roles: ["organizer", "participant"]
        }
    }

    expectRegisterWasCalledWith(data: RegisterUserDto) {
        expect(this.registerCallData).toEqual(data);
    }
}
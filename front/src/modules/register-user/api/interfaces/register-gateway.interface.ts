import type { RegisterModel } from "../../domain/model/register-model";

export type RegisterGatewayResponse = {
    id: string
    email: string
    role: RegisterModel.Role
}

export interface IRegisterGateway {
    register(payload: RegisterModel.Form) : Promise<RegisterGatewayResponse>;
}
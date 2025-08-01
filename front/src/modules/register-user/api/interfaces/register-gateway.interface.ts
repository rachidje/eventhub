import type { RegisterModel } from "../../domain/model/register-model";

export type RegisterGatewayResponse = {
    id: string
    email: string
    roles: RegisterModel.Role[]
}

export interface IRegisterGateway {
    register(payload: RegisterModel.Form) : Promise<RegisterGatewayResponse>;
}
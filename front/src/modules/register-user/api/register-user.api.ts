import axios from "axios";
import type { RegisterModel } from "../domain/model/register-model";
import type { IRegisterGateway, RegisterGatewayResponse } from "./interfaces/register-gateway.interface";

export class RegisterUserApi implements IRegisterGateway {
    async register(payload: RegisterModel.Form): Promise<RegisterGatewayResponse> {
        try {
            const response = await axios.post("/api/v1/user/register", payload)

            if(!response.data.success) {
                throw new Error(response.data.error.message || 'Unknown error from backend')
            }

            return response.data.data
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const msg = error.response?.data?.error?.message || error.message;
                throw new Error(msg)
            }
            throw error
        }
    }
}
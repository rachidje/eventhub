import axios from "axios";
import type { AuthModel } from "../domain/model/auth-model";
import type { LoginUserDto } from "./dto/login-user.dto";
import type { ILoginGateway } from "./interfaces/login-gateway.interface";

export class LoginUserApi implements ILoginGateway {
    async login(payload: AuthModel.LoginForm): Promise<LoginUserDto> {
        try {
            const response = await axios.post(
                "/api/v1/user/login", 
                payload,
                {
                    withCredentials: true
                }
            )

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
import type { AuthModel } from "../../domain/model/auth-model";

export interface ILoginGateway {
    login(payload: AuthModel.LoginForm): Promise<AuthModel.User>;
}
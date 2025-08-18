import type { AuthModel } from "../../domain/model/auth-model";

export interface ILoginGateway {
    token(payload: AuthModel.LoginForm): Promise<AuthModel.TokenPayload>;
}
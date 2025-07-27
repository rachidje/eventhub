import { IPasswordHasher } from "@shared/application/ports/password-hasher.interface";
import { IUserRepository } from "../ports/user-repository.interface";
import { ITokenGenerator } from "@shared/application/ports/token-generator.interface";

interface LoginUseCasePayload {
    email: string
    password: string
}

interface LoginUseCaseResult {
    token: string
}

export class LoginUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenGenerator: ITokenGenerator
    ) {}

    async execute(payload: LoginUseCasePayload): Promise<LoginUseCaseResult> {
        const user = await this.userRepository.findByEmail(payload.email);

        if (!user) {
            throw new Error("Wrong email or password");
        }


        const isPasswordValid = await this.passwordHasher.compare(payload.password, user.props.password);
        if (!isPasswordValid) {
            throw new Error("Wrong email or password");
        }

        const tokenPayload = {
            userId: user.props.id,
            email: user.props.email,
            roles: user.props.roles
        }

        const token = await this.tokenGenerator.generate(tokenPayload);

        return { token };
    }
}
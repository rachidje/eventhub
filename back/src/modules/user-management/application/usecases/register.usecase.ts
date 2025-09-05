import { Role } from "@user/domain/role.enum"
import { IUserRepository } from "../ports/user-repository.interface"
import { IPasswordPolicy } from "../ports/password-policy.interface"
import { IPasswordHasher } from "@shared/application/ports/password-hasher.interface"
import { User } from "@user/domain/user.entity"
import { IIdGenerator } from "@shared/application/ports/id-generator.interface"

interface RegisterUseCasePayload {
    firstname: string
    lastname: string
    email: string
    password: string
    role: Role
}

interface RegisterUseCaseResult {
    id: string
    email: string
    role: Role
}

export class RegisterUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordPolicy: IPasswordPolicy,
        private readonly passwordHasher: IPasswordHasher,
        private readonly idGenerator: IIdGenerator
    ) {}

    async execute(payload: RegisterUseCasePayload): Promise<RegisterUseCaseResult> {
        const existingUser = await this.userRepository.findByEmail(payload.email)

        if(existingUser) {
            throw new Error("User already exists with the same email")
        }

        const passwordValidation = this.passwordPolicy.validate(payload.password)

        if(!passwordValidation.valid) {
            throw new Error("Password is too weak: " + passwordValidation.reasons!.join(", "))
        }

        const hashedPassword = await this.passwordHasher.hash(payload.password)

        const id = this.idGenerator.generate()

        const user = new User({
            id,
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.email,
            password: hashedPassword,
            role: payload.role
        })

        await user.validateOrThrow()

        await this.userRepository.save(user)

        return {
            id,
            email: user.props.email,
            role: user.props.role
        }
    }
}
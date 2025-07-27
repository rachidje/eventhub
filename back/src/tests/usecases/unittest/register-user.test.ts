import { IPasswordHasher } from "@shared/application/ports/password-hasher.interface"
import { BcryptPasswordHasher } from "@shared/infrastructure/hashing/bcrypt-password.hasher"
import { UuidGenerator } from "@shared/infrastructure/uuid-generator"
import { unittestOrganizers } from "@tests/entities-test/unittest-organizers"
import { InMemoryUserRepository } from "@tests/infra-tests/in-memory-user-repository"
import { IPasswordPolicy } from "@user/application/ports/password-policy.interface"
import { BasicPasswordPolicy } from "@user/application/services/password-policy.service"
import { RegisterUseCase } from "@user/application/usecases/register.usecase"
import { Role } from "@user/domain/role.enum"

describe("Register user use case", () => {
    const payload = {
                firstname: "Alice",
                lastname: "Smith",
                email: "alice@example.com",
                password: "MyP@ssw0rd!",
                role: Role.organizer
            }

    let userRepository: InMemoryUserRepository
    let passwordPolicy: IPasswordPolicy
    let passwordHasher: IPasswordHasher
    let idGenerator: UuidGenerator
    let usecase: RegisterUseCase

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        passwordPolicy = new BasicPasswordPolicy()
        passwordHasher = new BcryptPasswordHasher()
        idGenerator = new UuidGenerator()
        usecase = new RegisterUseCase(
            userRepository, 
            passwordPolicy, 
            passwordHasher,
            idGenerator
        )
    })

    describe("Scenario: User already exists with the same email", () => {
        it("Should throw an error", async () => {
            await userRepository.save(unittestOrganizers.alice)

            await expect(usecase.execute(payload)).rejects.toThrow("User already exists with the same email")
        })
    })

    describe("Scenario: The password is weak", () => {
        const invalidPayload = {
            ...payload,
            password: "qwerty"
        }

        it("Should throw an error", async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Password is too weak: Too short")
        })
    })

    describe("Scenario: The password is hashed", () => {
        it("Should register the user", async () => {
            await usecase.execute(payload)

            const registeredUser = await userRepository.findByEmail(payload.email)

            const isHashedCorrectly = await passwordHasher.compare(payload.password, registeredUser!.props.password)

            expect(isHashedCorrectly).toBe(true)
        })
    })
})
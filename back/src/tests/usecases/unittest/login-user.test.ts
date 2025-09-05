import { IPasswordHasher } from "@shared/application/ports/password-hasher.interface";
import { ITokenGenerator } from "@shared/application/ports/token-generator.interface";
import { JwtTokenGenerator } from "@shared/infrastructure/auth/jwt-token-generator";
import { BcryptPasswordHasher } from "@shared/infrastructure/hashing/bcrypt-password.hasher";
import { buildOrganizerWithHashedPassword, unittestOrganizers } from "@tests/entities-test/unittest-organizers";
import { InMemoryUserRepository } from "@tests/infra-tests/in-memory-user-repository";
import { IUserRepository } from "@user/application/ports/user-repository.interface";
import { LoginUseCase } from "@user/application/usecases/login.usecase";

describe('Login user usecase', () => {
    let payload: {email: string, password: string};

    let userRepository: IUserRepository;
    let passwordHasher: IPasswordHasher;
    let tokenGenerator: ITokenGenerator;
    let usecase: LoginUseCase;

    beforeEach(async () => {
        const organizer = await buildOrganizerWithHashedPassword();
        payload = {
            email: organizer.alice.props.email,
            password: "qwerty"
        };

        userRepository = new InMemoryUserRepository();
        await userRepository.save(organizer.alice);

        passwordHasher = new BcryptPasswordHasher();
        tokenGenerator = new JwtTokenGenerator("secret");

        usecase = new LoginUseCase(userRepository, passwordHasher, tokenGenerator);
    });

    describe("Scenario: Email not found", () => {
        const invalidPayload = {
            email: "wrong email",
            password: unittestOrganizers.alice.props.password
        };

        it("Should return an error", async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Wrong email or password");
        });
    });

    describe("Scenario: Password is wrong", () => {
        const invalidPayload = {
            email: unittestOrganizers.alice.props.email,
            password: "wrong password"
        };

        it("Should return an error", async () => {
            await expect(usecase.execute(invalidPayload)).rejects.toThrow("Wrong email or password");
        });
    });

    describe("Scenario: Should return a token", () => {
        it("Should return a token", async () => {
            const {token, user} = await usecase.execute(payload);

            expect(token).toEqual(expect.any(String));
        });
    });
});
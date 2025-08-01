import { registerUserAction } from "../actions/register-user.action";
import type { RegisterModel } from "../domain/model/register-model";
import type { RegisterUserState } from "../store/register-user.slice";
import { MockRegisterGateway } from "./mock.register-gateway";
import { createTestStore } from "./tests-environment";

describe("Register User Action", () => {
    it("should save the user", async () => {
        const form : RegisterModel.Form = {
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@test.com",
            password: "!Password123",
            role: "organizer"
        }

        const registerState : RegisterUserState = {
            status: "idle",
            error: null
        }

        const registerGateway = new MockRegisterGateway();
        const store = createTestStore({
            initialState: {
                registerUser: registerState
            },
            dependencies: {
                registerGateway
            }
        })
        
        const promise = store.dispatch(registerUserAction(form))
        expect(store.getState().registerUser.status).toBe("loading")
        await promise;
        expect(store.getState().registerUser.status).toBe("success")

        registerGateway.expectRegisterWasCalledWith(form)
    });
});

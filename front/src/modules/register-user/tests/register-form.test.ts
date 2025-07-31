import { RegisterForm } from "../domain/forms/register-user-form";
import type { RegisterModel } from "../domain/model/register-model";

describe("Register Form", () => {
    const initialState : RegisterModel.Form = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: null
        }

    let form: RegisterForm;

    beforeEach(() => {
        form = new RegisterForm();
    })

    describe("Scenario: Update field", () => {
        it.each(
        [
            {
                field: "firstname" as keyof RegisterModel.Form,
                value: "John"
            }, {
                field: "lastname" as keyof RegisterModel.Form,
                value: "Doe"
            }, {
                field: "email" as keyof RegisterModel.Form,
                value: "john@doe.com"
            }, {
                field: "password" as keyof RegisterModel.Form,
                value: "123456"
            }
        ]
        )("should change the field %s", ({field, value}) => {
            const newState = form.updateField(initialState, field, value);
            expect(newState[field]).toEqual(value);
        });
    })

    describe("Scenario: Assign role", () => {
        it("should change the role field", () => {
            const newState = form.assignRole(initialState, "organizer");
            expect(newState.role).toEqual("organizer");
        });
    })

    describe("Scenario: Validate form", () => {
        it.each(
            [{
                role: "organizer" as RegisterModel.Role
            }, {
                role: "participant" as RegisterModel.Role
            }]
        )("should return true if the form is valid", ({role}) => {
            const validState : RegisterModel.Form = {
                firstname: "John",
                lastname: "Doe",
                email: "john@doe.com",
                password: "!Password1234",
                role
            };
            const result = form.isSubmittable(validState);
            expect(result).toEqual(true);
        });
    });
})
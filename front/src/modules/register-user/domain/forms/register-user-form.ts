import { produce } from "immer";
import type { RegisterModel } from "../model/register-model";
import { RegisterSchema } from "../schema/register-schema";

type ValidationError = Partial<Record<keyof RegisterModel.Form, string>>;

export class RegisterForm {
    updateField<K extends keyof RegisterModel.Form>(
        form: RegisterModel.Form,
        field: K,
        value: RegisterModel.Form[K]
    ) {
        return produce(form, (draft) => {
            draft[field] = value;
        });
    }

    assignRole(form: RegisterModel.Form, role: RegisterModel.Role) {
        return produce(form, (draft) => {
            draft.role = role;
        });
    }

    isSubmittable(form: RegisterModel.Form): boolean {
        return this.validate(form).isValid;
    }

    validate(form: RegisterModel.Form): {
        isValid: boolean
        errors: ValidationError
    } {
        const result = RegisterSchema.safeParse(form)

        if (result.success) {
            return {
                isValid: true,
                errors: {}
            }
        }

        const fieldErrors = result.error.formErrors.fieldErrors;

        const errors = Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
        ) as ValidationError;

        return {
            isValid: false,
            errors
        }
    }
}
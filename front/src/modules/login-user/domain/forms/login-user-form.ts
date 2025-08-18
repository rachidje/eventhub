import { produce } from "immer";
import type { AuthModel } from "../model/auth-model";
import { LoginSchema } from "../schema/login-schema";

type ValidationError = Partial<Record<keyof AuthModel.LoginForm, string>>;

export class LoginUserForm {
    updateField<K extends keyof AuthModel.LoginForm>(form: AuthModel.LoginForm, key: K, value: AuthModel.LoginForm[K]) {
        return produce(form, (draft) => {
            draft[key] = value;
        });
    }

    isSubmittable(form: AuthModel.LoginForm): boolean {
        return this.validate(form).isValid;
    }

    validate(
        form: AuthModel.LoginForm
    ): {
        isValid: boolean;
        errors: ValidationError;
    } {
        const result = LoginSchema.safeParse(form);

        if (result.success) {
            return {
                isValid: true,
                errors: {}
            };
        }

        const fieldErrors = result.error.formErrors.fieldErrors;

        const errors = Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
        ) as ValidationError;

        return {
            isValid: false,
            errors
        };
    }
}
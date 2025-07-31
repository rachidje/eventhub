import { ZodSchema } from "zod";

export class Form<TInput extends Record<string, any>> {
    constructor(private readonly schema: ZodSchema<TInput>) {}

    validate(input: TInput): {
        isValid: boolean;
        errors: Partial<Record<keyof TInput, string>>;
    } {
        const result = this.schema.safeParse(input);

        if (result.success) {
            return { isValid: true, errors: {} };
        }

        const fieldErrors = result.error.formErrors.fieldErrors;

        const errors = Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
        ) as Partial<Record<keyof TInput, string>>;

        return { isValid: false, errors };
    }
}

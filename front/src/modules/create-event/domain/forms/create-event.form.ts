import { produce } from "immer"
import type { EventModelDomain } from "../model/event-model.domain"
import { EventSchema } from "../schema/event-schema";

type ValidationError = Partial<Record<keyof EventModelDomain.Form, string>>;

export class CreateEventForm {
    update<T extends keyof EventModelDomain.EventModel>(
        form: EventModelDomain.Form,
        key: T,
        value: EventModelDomain.EventModel[T]
    ) {
        return produce(form, (draft) => {
            draft.event[key] = value
        })
    }

    isSubmittable(form: EventModelDomain.Form): boolean {
        return this.validate(form.event).isValid;
    }

    validate(event: EventModelDomain.EventModel): {
        isValid: boolean
        errors: ValidationError
    } {
        const result = EventSchema.safeParse(event)

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
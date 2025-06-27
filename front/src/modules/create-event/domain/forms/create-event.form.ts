import { produce } from "immer"
import type { EventModelDomain } from "../model/event-model.domain"

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
}
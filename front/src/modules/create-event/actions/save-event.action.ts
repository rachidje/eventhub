import type { AppDispatch, AppGetState } from "@eventhub/store/store";
import type { EventModelDomain } from "../domain/model/event-model.domain";
import type { Dependencies } from "@eventhub/store/dependencies";
import { createEventActions } from "../store/create-event.slice";
import { extractErrorMessage } from "@eventhub/shared/error.utils";

export const saveEventAction = (form: EventModelDomain.Form) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        const result = await dependencies.saveEvent.saveEvent(form)
        dispatch(createEventActions.handleSuccessEventCreation(result.id))
    } catch (error) {
        dispatch(createEventActions.handleErrorEventCreation(extractErrorMessage(error)))
    }
}
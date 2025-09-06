import type { Dependencies } from "@eventhub/store/dependencies";
import type { AppDispatch, AppGetState } from "@eventhub/store/store";
import { extractErrorMessage } from "@eventhub/shared/error.utils";
import { listEventsActions } from "../store/list-events.slice";

export const fetchEventsAction = async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    dispatch(listEventsActions.handleLoading())

    try {
        const events = await dependencies.listEventsApi.list()
        dispatch(listEventsActions.loaded(events))
    } catch (error) {
        dispatch(listEventsActions.failed(extractErrorMessage(error)))
    }
}
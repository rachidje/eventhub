import type { Dependencies } from "@eventhub/store/dependencies";
import type { AppDispatch, AppGetState } from "@eventhub/store/store";
import { createEventActions } from "../store/create-event.slice";
import { extractErrorMessage } from "@eventhub/shared/error.utils";

export const fetchVenuesAction = async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    dispatch(createEventActions.handleLoadingVenues())

    try {
        const venues = await dependencies.fetchVenues.getVenues()
        dispatch(createEventActions.storeVenues(venues))
    } catch (error) {
        dispatch(createEventActions.handleErrorVenues(extractErrorMessage(error)))
    }
}
import type { AppDispatch, AppGetState } from "@eventhub/store/store";
import type { RegisterModel } from "../domain/model/register-model";
import type { Dependencies } from "@eventhub/store/dependencies";
import { registerUserActions } from "../store/register-user.slice";
import { extractErrorMessage } from "@eventhub/shared/error.utils";
import { flashActions } from "@eventhub/modules/base/store/flash-message.slice";

export const registerUserAction = (form: RegisterModel.Form) => async (dispatch: AppDispatch, _: AppGetState, dependencies: Dependencies) => {
    try {
        dispatch(registerUserActions.handleRegisterUserLoading())
        const result = await dependencies.registerGateway.register(form) as any
        dispatch(registerUserActions.handleSuccessRegisterUser(result))
        dispatch(flashActions.showFlash({ message: "Félicitations !", level: "success", ttlMs: 3000 }))
        return true
    } catch (error) {
        // dispatch(registerUserActions.handleErrorRegisterUser(extractErrorMessage(error)))
        dispatch(flashActions.showFlash({ message: extractErrorMessage(error), level: "error", ttlMs: 3000 }))
        return false
    }
}
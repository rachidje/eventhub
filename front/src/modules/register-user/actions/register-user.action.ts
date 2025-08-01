import type { AppDispatch, AppGetState } from "@eventhub/store/store";
import type { RegisterModel } from "../domain/model/register-model";
import type { Dependencies } from "@eventhub/store/dependencies";
import { registerUserActions } from "../store/register-user.slice";
import { extractErrorMessage } from "@eventhub/shared/error.utils";

export const registerUserAction = (form: RegisterModel.Form) => async (dispatch: AppDispatch, _: AppGetState, dependencies: Dependencies) => {
    try {
        dispatch(registerUserActions.handleRegisterUserLoading())
        const result = await dependencies.registerGateway.register(form) as any
        dispatch(registerUserActions.handleSuccessRegisterUser(result))
    } catch (error) {
        dispatch(registerUserActions.handleErrorRegisterUser(extractErrorMessage(error)))
    }
}
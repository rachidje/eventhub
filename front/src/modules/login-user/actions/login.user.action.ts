import { extractErrorMessage } from "@eventhub/shared/error.utils";
import type { Dependencies } from "@eventhub/store/dependencies";
import type { AppDispatch, AppGetState } from "@eventhub/store/store";
import type { AuthModel } from "../domain/model/auth-model";
import { authSlice } from "../store/login-user.slice";
import { flashActions } from "@eventhub/modules/base/store/flash-message.slice";

export const loginUserAction = (form: AuthModel.LoginForm) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(authSlice.actions.handleLoginUserLoading());
        const result = await dependencies.loginUserApi.login(form);

        dispatch(authSlice.actions.handleSuccessLoginUser(result.user));
        dispatch(flashActions.showFlash({message: "Vous êtes maintenant connecté", level: "success", ttlMs: 3000}))
        return true
    } catch (error) {
        dispatch(authSlice.actions.handleErrorLoginUser(extractErrorMessage(error)));
        dispatch(flashActions.showFlash({message: "Erreur lors de la connexion", level: "error", ttlMs: 3000}))
        return false
    }
}
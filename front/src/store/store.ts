import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { Dependencies } from "./dependencies";
import { createEventReducer } from "@eventhub/modules/create-event/store/create-event.slice";
import { registerUserReducer } from "@eventhub/modules/register-user/store/register-user.slice";
import { authReducer } from "@eventhub/modules/login-user/store/login-user.slice";
import { flashReducer } from "@eventhub/modules/base/store/flash-message.slice";

const reducers = combineReducers({
    flash: flashReducer,
    createEvent: createEventReducer,
    registerUser: registerUserReducer,
    auth: authReducer
});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];


export const createStore = (config: {
    initialState?: AppState;
    dependencies: Dependencies;
}) => {
    const store = configureStore({
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: config.dependencies,
                }
            })
        }
    })

    return store;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
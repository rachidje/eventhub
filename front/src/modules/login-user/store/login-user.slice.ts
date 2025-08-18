import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthModel } from "../domain/model/auth-model"

export type AuthState = {
    status: "idle" | "loading" | "success" | "error"
    error: string | null
    userId: string | null
    token: string | null
    isAuthenticated: boolean
}

export const initialState: AuthState = {
    status: "idle",
    error: null,
    userId: null,
    token: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        handleLoginUserLoading: (state) => {
            state.status = "loading";
            state.error = null;
            state.token = null;
            state.userId = null;
        },
        handleSuccessLoginUser: (state, action: PayloadAction<AuthModel.TokenPayload>) => {
            state.status = "success";
            state.error = null;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        handleErrorLoginUser: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
            state.userId = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
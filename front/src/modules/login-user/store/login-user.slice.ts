import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthModel } from "../domain/model/auth-model"

export type AuthState = {
    status: "idle" | "loading" | "success" | "error"
    error: string | null
    userId: string | null
    token: string | null
    isAuthenticated: boolean
    user: AuthModel.User
}

export const initialState: AuthState = {
    status: "idle",
    error: null,
    userId: null,
    token: null,
    isAuthenticated: false,
    user: {
        userId: "",
        email: "",
        role: null
    }
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
        handleSuccessLoginUser: (state, action: PayloadAction<AuthModel.User>) => {
            state.status = "success";
            state.isAuthenticated = true;
            
            // ✅ Remplacer complètement l'objet user au lieu de muter les propriétés
            state.user = {
                userId: action.payload.userId,
                email: action.payload.email,
                role: action.payload.role
            };
            
            // ✅ TEMPORAIRE : Log pour déboguer
            console.log("✅ handleSuccessLoginUser payload:", action.payload);
            console.log("✅ handleSuccessLoginUser state.user:", state.user);
        },
        handleErrorLoginUser: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
            state.userId = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.user.email = "";
            state.user.role = null;
            state.user.userId = "";
            state.isAuthenticated = false;
            state.error = null;
            state.status = "idle";
        },
        hydrateAuth: (state, action: PayloadAction<AuthModel.User>) => {
            state.user.email = action.payload.email;
            state.user.role = action.payload.role;
            state.isAuthenticated = true;
            state.error = null;
            state.status = "success";
        },
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
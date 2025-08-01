import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type RegisterUserState = {
    status: "idle" | "loading" | "success" | "error"
    error: string | null
}

export const initialState: RegisterUserState = {
    status: "idle",
    error: null
}

export const registerUserSlice = createSlice({
    name: "registerUser",
    initialState,
    reducers: {
        handleRegisterUserLoading: (state) => {
            state.status = "loading";
        },
        handleSuccessRegisterUser: (state) => {
            state.status = "success";
            state.error = null;
        },
        handleErrorRegisterUser: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
        }
    }
})

export const registerUserReducer = registerUserSlice.reducer;
export const registerUserActions = registerUserSlice.actions;

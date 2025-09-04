// modules/base/store/flash.slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FlashLevel = 'success' | 'info' | 'warning' | 'error';
export type FlashPayload = { message: string; level?: FlashLevel; ttlMs?: number };

type FlashState = {
    message: string | null;
    level: FlashLevel;
};

const initialState: FlashState = { message: null, level: 'info' };

const flashSlice = createSlice({
    name: 'flash',
    initialState,
    reducers: {
        showFlash: (state, action: PayloadAction<FlashPayload>) => {
            state.message = action.payload.message;
            state.level = action.payload.level ?? 'info';
        },
        clearFlash: (state) => {
            state.message = null;
        }
    }
});

export const flashReducer = flashSlice.reducer;
export const flashActions = flashSlice.actions;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EventListModel } from "../domain/event-list.model";

export interface ListEventsState {
    events: {
        status: "idle" | "loading" | "loaded" | "error"
        error: string | null
        data: EventListModel.EventItem[]
    },
}

const initialState: ListEventsState = {
    events: {
        status: "idle",
        error: null,
        data: []
    },
};

const listEventsSlice = createSlice({
    name: "listEvents",
    initialState,
    reducers: {
        handleLoading(state) {
            state.events.status = "loading";
            state.events.error = null;
        },
        loaded(state, action: PayloadAction<EventListModel.EventItem[]>) {
            state.events.status = "loaded";
            state.events.data = action.payload;
        },
        failed(state, action: PayloadAction<string>) {
            state.events.status = "error";
            state.events.error = action.payload;
        }
    },
});

export const listEventsActions = listEventsSlice.actions;
export const listEventsReducer = listEventsSlice.reducer;

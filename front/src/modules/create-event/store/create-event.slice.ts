import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EventModelDomain } from "../domain/model/event-model.domain"

export type CreateEventState = {
    form: EventModelDomain.Form
    venues: {
        status: "idle" | "loading" | "loaded" | "error"
        error: string | null
        data: EventModelDomain.Venue[]
    }
}

const initialState: CreateEventState = {
    form: {
        event: {
            name: "",
            description: "",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            venueName: "",
            capacity: 0,
            price: 0
        }
    },
    venues: {
        status: "idle",
        error: null,
        data: []
    }

}

export const createEventSlice = createSlice({
    name: "createEvent",
    initialState,
    reducers: {
        handleLoadingVenues: (state) => {
            state.venues.status = "loading"
        },
        storeVenues: (state, action: PayloadAction<EventModelDomain.Venue[]>) => {
            state.venues.status = "loaded"
            state.venues.data = action.payload
        },
        handleErrorVenues: (state, action: PayloadAction<string>) => {
            state.venues.status = "error"
            state.venues.error = action.payload
        }
    }
})

export const createEventReducer = createEventSlice.reducer
export const createEventActions = createEventSlice.actions
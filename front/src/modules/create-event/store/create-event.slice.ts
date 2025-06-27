import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EventModelDomain } from "../domain/model/event-model.domain"

export type CreateEventState = {
    form: EventModelDomain.Form
    venues: {
        status: "idle" | "loading" | "loaded" | "error"
        error: string | null
        data: EventModelDomain.Venue[]
    },
    eventCreation: {
        status: "idle" | "loading" | "success" | "error"
        error: string | null
        eventId: string | null
    }
}

const initialState: CreateEventState = {
    form: {
        event: {
            name: "",
            description: "",
            date: new Date().toISOString(),
            startTime: "9:00",
            endTime: "18:00",
            venueName: "",
            capacity: 0,
            price: 0
        }
    },
    venues: {
        status: "idle",
        error: null,
        data: []
    },
    eventCreation: {
        status: "idle",
        error: null,
        eventId: null
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
        },
        handleSuccessEventCreation: (state, action: PayloadAction<string>) => {
            state.eventCreation.status = "success"
            state.eventCreation.eventId = action.payload
            state.eventCreation.error = null
        },
        handleErrorEventCreation: (state, action: PayloadAction<string>) => {
            state.eventCreation.status = "error"
            state.eventCreation.error = action.payload
            state.eventCreation.eventId = null
        }
    }
})

export const createEventReducer = createEventSlice.reducer
export const createEventActions = createEventSlice.actions
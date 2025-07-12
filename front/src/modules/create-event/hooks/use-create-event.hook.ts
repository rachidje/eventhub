import { useAppDispatch, type AppState } from "@eventhub/store/store"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { fetchVenuesAction } from "../actions/fetch-venues.action"
import { saveEventAction } from "../actions/save-event.action"
import { CreateEventForm } from "../domain/forms/create-event.form"
import type { EventModelDomain } from "../domain/model/event-model.domain"

export const useCreateEvent = () => {
    function update<T extends keyof EventModelDomain.EventModel>(
        key: T,
        value: EventModelDomain.EventModel[T]
    ) {
        const newState = createEventForm.current.update(form, key, value)
        setForm(newState)
    }

    function submit() {
        dispatch(saveEventAction(form))
    }

    function isSubmittable() {
        return createEventForm.current.isSubmittable(form)
    }

    const dispatch = useAppDispatch()

    // Chargement des venues
    useEffect(() => {
        dispatch(fetchVenuesAction)
    }, [dispatch])

    const venues = useSelector((state: AppState) => state.createEvent.venues)
    const createEventForm = useRef(new CreateEventForm());
    const [form, setForm] = useState<EventModelDomain.Form>({
        event: {
            name: "",
            description: "",
            date: new Date().toISOString(),
            startTime: "9:00",
            endTime: "10:00",
            venueName: "",
            capacity: 0,
            price: 0
        }
    })

    return {
        update,
        submit,
        isSubmittable: isSubmittable(),
        form,
        venues
    }
}
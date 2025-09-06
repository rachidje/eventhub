import { useAppDispatch, type AppState } from "@eventhub/store/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { fetchEventsAction } from "../actions/fetch-events.action"

export const useListEvents = () => {

    const dispatch = useAppDispatch()
    const events = useSelector((state: AppState) => state.listEvents.events.data)
    const loading = useSelector((state: AppState) => state.listEvents.events.status === "loading")

    // Chargement des events
    useEffect(() => {
        dispatch(fetchEventsAction)
    }, [dispatch])


    return {
        events,
        loading
    }
}
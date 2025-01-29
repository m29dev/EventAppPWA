import { createSlice } from '@reduxjs/toolkit'
import {
    clearEventInfo,
    getEventInfo,
} from '../services/localStorageEventService'

const initialState = {
    eventInfo: getEventInfo(),
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEventInfo: (state, action) => {
            state.eventInfo = action.payload
            setEventInfo(action.payload)
        },
        updateEventDateInfo: (state, action) => {
            state.eventInfo.date = action.payload.date
            setEventInfo(state.eventInfo)
        },
        updateEventTimeInfo: (state, action) => {
            state.eventInfo.time = action.payload.time
            setEventInfo(state.eventInfo)
        },
        clearEvent(state, action) {
            state.eventInfo = null
            clearEventInfo()
        },
    },
})

export const {
    setEventInfo,
    updateEventDateInfo,
    updateEventTimeInfo,
    clearEvent,
} = eventSlice.actions
export default eventSlice.reducer

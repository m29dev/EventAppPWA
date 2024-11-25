import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    eventInfo: localStorage.getItem('eventInfo')
        ? JSON.parse(localStorage.getItem('eventInfo'))
        : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEventInfo: (state, action) => {
            state.eventInfo = action.payload
            localStorage.setItem('eventInfo', JSON.stringify(action.payload))
        },
        updateEventDateInfo: (state, action) => {
            state.eventInfo.date = action.payload.date
            localStorage.setItem('eventInfo', JSON.stringify(state.eventInfo))
        },
        updateEventTimeInfo: (state, action) => {
            state.eventInfo.time = action.payload.time
            localStorage.setItem('eventInfo', JSON.stringify(state.eventInfo))
        },

        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },

        getUser(state, action) {
            const user = state
            return user
        },
    },
})

export const {
    setEventInfo,
    updateEventDateInfo,
    updateEventTimeInfo,
    setUser,
    getUser,
} = userSlice.actions
export default userSlice.reducer

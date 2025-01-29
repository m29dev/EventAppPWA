import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import eventSlice from './eventSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        event: eventSlice,
    },
})

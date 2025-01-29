import { createSlice } from '@reduxjs/toolkit'
import {
    clearUserInfo,
    getUserInfo,
    setUserInfo,
} from '../services/localStorageUserService'

const initialState = {
    user: getUserInfo(),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            setUserInfo(action.payload)
        },
        clearUser(state, action) {
            state.user = null
            clearUserInfo()
        },
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

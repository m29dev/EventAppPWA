import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: [
        localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    ],
    reducers: {
        setUser(state, action) {
            state.push({
                id: action.payload.id,
                name: action.payload.name,
            })
        },
        getUser(state, action) {
            const user = state
            return user
        },
    },
})

export const { setUser, getUser } = userSlice.actions
export default userSlice.reducer

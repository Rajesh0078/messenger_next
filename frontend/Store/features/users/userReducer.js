
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: typeof window !== "undefined" ? localStorage.getItem("user") : null
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action) {
            state.user = localStorage.getItem("user")
        }
    },
})

export const { updateUser } = userReducer.actions
export default userReducer.reducer
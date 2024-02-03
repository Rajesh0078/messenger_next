import { createSlice } from '@reduxjs/toolkit'

const initialState = { userInfo: "" }

const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {

        updateUser(state, action) {
            state.userInfo = action.payload
        },
    },
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer
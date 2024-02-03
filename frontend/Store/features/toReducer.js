import { createSlice } from '@reduxjs/toolkit'

const initialState = { to: "", userInfo: "" }

const recieverSlice = createSlice({
    name: 'reciever',
    initialState,
    reducers: {
        updateUser(state, action) {
            state.userInfo = action.payload
        },

        updateReciever(state, action) {
            state.to = action.payload
        },
    },
})

export const { updateReciever, updateUser } = recieverSlice.actions
export default recieverSlice.reducer
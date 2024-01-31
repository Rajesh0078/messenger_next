import { API } from '@/utils/Api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: null,
    isLoading: false,
    error: null
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (token) => {
        const res = await axios(API.getUser, { headers: { "x-token": token } })
        const data = await res.data
        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})

// export const { updateUser } = userReducer.actions
export default userSlice.reducer
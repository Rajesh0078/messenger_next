import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '@/utils/Api';

const initialState = {
    user: null,
    isLoading: false,
    error: null
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (token) => {
        try {
            const res = await axios.get(API.getUser, { headers: { "x-token": token } });
            return res.data;
        } catch (error) {
            throw new Error('Failed to fetch user data');
        }
    }
);



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        ...initialState,
    },
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(fetchUser.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = null; // Reset error state
        // });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        // builder.addCase(fetchUser.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.error.message;
        // });
    },
});

export default userSlice.reducer;

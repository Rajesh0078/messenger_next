import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '@/utils/Api';

const initialState = {
    user: null,
    isLoading: false,
    error: null
};

export const fetchAllUser = createAsyncThunk(
    'user/Alluser',
    async () => {
        try {
            const { data } = await axios.get(API.allUsers);
            return data?.users
        } catch (error) {
            throw new Error('Failed to fetch all users  data');
        }
    }
);



export const alluserSlice = createSlice({
    name: 'alluser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(fetchUser.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = null; // Reset error state
        // });
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchAllUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default alluserSlice.reducer;

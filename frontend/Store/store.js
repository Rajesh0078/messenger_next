"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userReducer";
import allUsersReducer from "./features/allUsers/allUsersReducer";

export const store = () => configureStore({
    reducer: {
        user: userReducer,
        alluser: allUsersReducer
    }
})
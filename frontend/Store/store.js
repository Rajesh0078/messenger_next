"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userReducer";
import allUsersReducer from "./features/allUsers/allUsersReducer";
import recieverReducer from "./features/toReducer"

export const store = () => configureStore({
    reducer: {
        user: userReducer,
        alluser: allUsersReducer,
        reciever: recieverReducer
    }
})
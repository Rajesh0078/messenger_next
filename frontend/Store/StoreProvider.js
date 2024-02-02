"use client"
import { useEffect, useRef } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { parseCookies } from "nookies"
import { fetchUser } from "./features/users/userReducer";
import { fetchAllUser } from "./features/allUsers/allUsersReducer";

export const StoreProvider = ({ children }) => {
    const { token } = parseCookies();
    const storeRef = useRef(store());

    useEffect(() => {
        if (token) {
            storeRef.current.dispatch(fetchUser(token));
            storeRef.current.dispatch(fetchAllUser())
        }
    }, [token]);

    return <Provider store={storeRef.current}>{children}</Provider>;
};
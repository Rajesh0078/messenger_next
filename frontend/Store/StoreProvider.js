"use client"
import { useRef } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { destroyCookie, parseCookies } from "nookies"
import { fetchUser } from "./features/users/userReducer";
import { logout } from "@/utils/routes";

export const StoreProvider = ({ children }) => {
    const { token } = parseCookies()
    const storeRef = useRef()
    if (!storeRef.current) {
        storeRef.current = store()
        if (token) {
            storeRef.current.dispatch(fetchUser(token))
        }
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
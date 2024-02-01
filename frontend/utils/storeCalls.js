"use client"

import axios from "axios"
import { API } from "./Api"

export const updateUser = (data) => {
    const store = useAppStore()
    store.dispatch(updateUser(data))
}

export const getUserByRedux = async (token) => {
    if (token) {
        console.log("hi")
        const res = await axios.get(API.getUser, { headers: { "x-token": token } })
        const data = await res.data
        return data
        // console.log(data)
    } else {
        console.log("first")
    }
}
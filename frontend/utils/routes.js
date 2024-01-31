"use server"
import axios from "axios"
import { API } from "./Api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const login = async (body) => {
    const { data } = await axios.post(API.login, body)
    if (data.success) {
        return data.token
    } else {
        return data.message
    }
}

export const getUser = async (token) => {
    const { data } = await axios.get(API.getUser, { headers: { "x-token": token } })
    return data
}

export const logout = async () => {
    await cookies().delete("token")
    await redirect("/")
    // return true
}


"use server"
import axios from "axios"
import { API } from "./Api"
import { cookies } from "next/headers"
import { updateUser } from "./storeCalls"


export const login = async (body) => {
    const { data } = await axios.post(API.login, body)
    if (data.success) {
        cookies().set("token", data.token, { secure: true })
        let user = getUser(data.token)
        return user
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
    return true
}
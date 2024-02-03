"use server"
import axios from "axios"
import { API } from "./Api"
import { cookies } from "next/headers"


export const login = async (body) => {
    const { data } = await axios.post(API.login, body)
    if (data.token) {
        return {
            success: true,
            token: data.token
        }
    } else {
        return {
            success: false,
            message: "User not found"
        }
    }
}

export const getReciever = async () => {
    const receive = await cookies().get("name")
    console.log(receive)
    return receive
}

export const getUser = async (token) => {
    const { data } = await axios.get(API.getUser, { headers: { "x-token": token } })
    return data
}

export const fetchUser = async (token) => {
    const res = await fetch(API.getUser, { headers: { "x-token": token }, })
    const data = await res.json()
    return data
}

export const allUsers = async () => {
    const { data } = await axios.get(API.allUsers)
    return data
}


export const postMsg = async (msg) => {
    const { data } = await axios.post(API.postMsg, msg)
    return data
}

export const getMsg = async (from, to) => {
    const { data } = await axios.post(API.getMsg, { from: from, to: to })
    return data
}
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

export const register = async (body) => {
    const { data } = await axios.post(API.register, body)
    return data
}

export const removeToken = async () => {
    await cookies().delete("token")
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
    const res = await fetch(API.getUser, { headers: { "x-token": token }, cache: "force-cache" })
    const data = await res.json()
    return data
}

export const allUsers = async () => {
    const { data } = await axios.get(API.allUsers)
    return data
}


export const searchUser = async (id) => {

    const response = await fetch(API.findUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    });
    const data = await response.json()
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

// export const sendMsg = async (from, to, text) => {
//     let obj = { message_from: from, message_to: to, message: text }
//     obj = new URLSearchParams(obj).toString()
//     const data = await axios.get(`${API.sendMsg}?${obj}`)
//     return data
// }

// export const openMsg = async () => {
//     const data = await axios.get("https://1fb9-2401-4900-1f3f-43f5-9b3-e77a-c83d-7f4e.ngrok-free.app/sugerElite/chat/list")
//     return data.data
// }
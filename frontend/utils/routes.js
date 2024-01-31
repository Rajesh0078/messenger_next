"use server"
import axios from "axios"
import { API } from "./Api"


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


export const postMsg = async (msg) => {
    const { data } = await axios.post(API.postMsg, msg)
    return data
}

export const getMsg = async (msg) => {
    const { data } = await axios.post(API.getMsg, msg)
    return data
}
"use server"
import axios from "axios"
import { API } from "./Api"


export const login = async (body) => {
    const { data } = await axios.post(API.login, body)
    if (data.success) {
        return data
    } else {
        return data
    }
}

export const getUser = async (token) => {
    const { data } = await axios.get(API.getUser, { headers: { "x-token": token } })
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

export const getMsg = async (email) => {
    const { data } = await axios.post(API.getMsg, email)
    return data
}
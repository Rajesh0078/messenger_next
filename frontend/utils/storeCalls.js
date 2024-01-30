"use client"
import { useAppStore } from "@/Store/hooks"

export const updateUser = (data) => {
    const store = useAppStore()
    store.dispatch(updateUser(data))
}
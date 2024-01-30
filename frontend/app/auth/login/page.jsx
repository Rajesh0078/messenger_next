"use client"

import { login } from "@/utils/routes"
import { useRouter } from "next/navigation"

const page = () => {
    const navigate = useRouter()

    const clickHandler = async () => {
        let check = await login({ email: "a@gmail.com", password: "123" })
        if (check?.success) {
            navigate.push("/")
            console.log("kk", check)
        } else {
            console.log("Login ::", check)
        }
    }

    return (
        <div onClick={clickHandler}>Login</div>
    )
}

export default page
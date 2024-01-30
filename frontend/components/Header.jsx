"use client"

import { useRouter } from "next/navigation"
import Button from "./Button"
import { login } from "@/utils/routes"
import { useAppSelector, useAppStore } from "../Store/hooks"
import { updateUser } from "@/utils/storeCalls"



const Header = () => {


    const select = useAppSelector((state) => state.user)
    const string = (JSON.stringify(select))

    console.log(JSON.parse(string))

    const navigate = useRouter()

    const clickHandler = async () => {
        let check = await login({ email: "a@gmail.com", password: "123" })
        if (check?.success) {
            // store.dispatch(updateUser(check.user))
            localStorage.setItem("user", JSON.stringify(check.user))
            navigate.push("/")
        } else {
            console.log("Login ::", check)
        }
    }

    return (
        <header className="bg-gray-800 w-full text-white px-4 py-3">
            <div className="relative ">
                <i className="font-bold text-2xl">Messanger</i>
                <div className="absolute top-0 right-0 h-full align-middle" onClick={clickHandler}>
                    <Button styles='bg-blue-700 px-8 h-full text-sm rounded-full hover:px-10 sm:hover:px-12 transition-all duration-300' type={"button"} value={'Login'} />
                </div>
            </div>
        </header>
    )
}

export default Header
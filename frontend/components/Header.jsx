"use client"
import { logout } from "@/utils/routes"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

const Header = () => {

    const [user, setUser] = useState('')

    const known = useSelector((state) => state.user)
    const navigate = useRouter()

    useEffect(() => {
        setUser(known.user)
    }, [known])

    console.log(user)
    return (
        <header className="bg-blue-900 text-white p-3">
            <div className="relative">
                <p className="font-medium">Messanger</p>
                <div className="absolute top-[50%] -translate-y-[50%] right-0">
                    {user?.success && <span onClick={() => { logout(); }} className="bg-gray-100 px-4 hover:px-6 cursor-pointer py-1 rounded-full text-sm font-medium text-blue-900">Logout</span>}
                </div>
            </div>
        </header>
    )
}

export default Header
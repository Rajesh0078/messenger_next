"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { destroyCookie } from "nookies"

const Header = () => {

    const [user, setUser] = useState(null)

    const known = useSelector((state) => state.user)
    const navigate = useRouter()

    useEffect(() => {
        setUser(known)
    }, [known])

    const logoutHandler = () => {
        destroyCookie(null, "token")
        navigate.push("/")
    }

    // console.log(user)
    return (
        <header className="bg-blue-900 text-white p-4 z-10 fixed top-0 left-0 w-full">
            <div className="relative">
                <p className="font-medium">Messanger</p>
                <div className="absolute top-[50%] -translate-y-[50%] right-0">
                    {!user?.isLoading && <span onClick={logoutHandler} className="bg-gray-100 px-4 hover:px-6 cursor-pointer py-1 rounded-full text-sm font-medium text-blue-900">Logout</span>}
                </div>
            </div>
        </header>
    )
}

export default Header
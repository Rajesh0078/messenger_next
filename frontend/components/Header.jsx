"use client"
import { useRouter } from "next/navigation"
import { destroyCookie } from "nookies"

const Header = ({ user }) => {

    const navigate = useRouter()
    // console.log(user)


    const logoutHandler = () => {
        destroyCookie(null, "token")
        navigate.push("/", { scroll: false })
    }

    return (
        <header className="bg-blue-900 text-white p-4 z-10 fixed top-0 left-0 w-full ">
            <div className="relative">
                <p className="font-medium" onClick={() => navigate.push("/chat", { scroll: false })}>Messanger</p>
                <div className="absolute top-[50%] -translate-y-[50%] right-0">
                    {user?.username &&
                        <div>
                            <span onClick={() => navigate.push("/profile", { scroll: false })}>{user?.username}</span>
                            <span onClick={logoutHandler} className="bg-gray-100 px-4  cursor-pointer ms-3 py-1 rounded-full text-sm font-medium text-blue-900">Logout</span>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
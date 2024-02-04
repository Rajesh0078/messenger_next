"use client"

import { allUsers } from "@/utils/routes"
import { useEffect, useState } from "react"
import Loader from "./Loader"
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { BsFillBellFill, BsFillSearchHeartFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

let socket;

const SearchPage = ({ currentUser, users }) => {

    const navigate = useRouter()

    const [onlineUsers, setOnlineUsers] = useState(users.users)

    function updateUsers(email, status) {
        const updatedUsers = users.users.map(user => user.email === email ? { ...user, online: status } : user);
        setOnlineUsers(updatedUsers);
    }

    function socketInitializer() {
        fetch("/api/socket");

        socket = io();

        socket.on("connect", () => {
            socket.emit("add-user", currentUser.email)
        })

        socket.on("user-status", ({ userId, status }) => {
            if (userId !== currentUser?.email) {
                updateUsers(userId, status)
            }
        });
    }

    useEffect(() => {

        socketInitializer();

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }

    }, [])





    return (
        <>
            {
                onlineUsers.length &&
                <div className='pt-[56px] flex flex-col md:flex-row'>
                    {/* Mobile view */}
                    <div className='border flex md:hidden justify-between shadow-lg px-4  py-2 text-center '>
                        <div className="font-bold text-lg">Filter</div>
                        <div className="sm:hidden text-gray-700  flex text-2xl gap-4 me-3 ">
                            <BsFillSearchHeartFill className="cursor-pointer hover:text-black" onClick={() => navigate.push("/search", { scroll: false })} />
                            <BsFillBellFill className="cursor-pointer hover:text-black" />
                        </div>
                    </div>

                    {/* desktop view */}
                    <div className='border basis-2/5 xl:basis-1/4 shadow-xl md:block hidden min-h-[calc(100vh-56px)] '>filter </div>
                    <div className='border basis-5/6 p-4 py-4 flex flex-wrap justify-evenly gap-5'>
                        {
                            onlineUsers.filter((i) => i.email !== currentUser?.email).map((i, inx) => {
                                return (
                                    <div key={inx} onClick={() => navigate.push(`/user/${i._id}`, { scroll: false })} className="bg-gray-300 hover:scale-105 cursor-pointer ease-linear duration-100 transition-transform shadow-xl pt-2 max-h-[13rem] w-[12rem] rounded-xl relative">
                                        <img src={"https://cdn-icons-png.flaticon.com/512/21/21104.png"} alt="imhha" className="h-full rounded-b-xl object-cover opacity-[60%] mx-auto" />
                                        <div className="bg-gray-700 bg-opacity-[80%] rounded-b-xl absolute bottom-0 py-1 text-center text-white w-full text-xs">
                                            <p className="font-medium">{i.username}</p>
                                            <p>{i.email}</p>
                                        </div>
                                        <div className={`${i.online === "online" ? "block" : "hidden"} bg-blue-600 h-4 w-4 absolute left-2 rounded-full top-2 `}>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                !onlineUsers.length &&
                <Loader />
            }
        </>
    )
}

export default SearchPage
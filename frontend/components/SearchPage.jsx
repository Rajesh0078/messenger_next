"use client"

import { allUsers } from "@/utils/routes"
import React, { useEffect, useState } from "react"
import Loader from "./Loader"
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { BsFillBellFill, BsFillSearchHeartFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Swiper from "./Swiper";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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

        socket.on("connect", () => {
            socket.emit("add-user", currentUser.email)
        })

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }

    }, [])


    const updateMade = () => {
        const images = [
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/117/01HN4ZWGWPZP65ZDD8JGKAXGMQ.jpg", premium: true },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/113/01HN36GTS9RDAVS3MW0AV1DVYR.png", premium: true },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/121/01HN4ZXK02T1GA03CN8BQW5WGF.jpg", premium: false },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/113/01HN36GTS9RDAVS3MW0AV1DVYR.png", premium: true },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/129/01HN500MXX7ZXGQFMEX3NGXXXK.jpg", premium: false },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/133/01HN501K7HWTTMJABKWCWSDNB1.jpg", premium: false },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/113/01HN36GTS9RDAVS3MW0AV1DVYR.png", premium: true },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/176/01HN50P8VDWDDGJKQF9JEJ209K.jpg", premium: true },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/121/01HN4ZXK02T1GA03CN8BQW5WGF.jpg", premium: true },
            { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/173/01HN50M87R65X9T9PC08045CTF.jpg", premium: true },
        ]
        let arr = []
        onlineUsers.forEach((user, i) => {
            let obj = { ...user, ["imgUrl"]: images[(i - 1)]?.image }
            arr.push(obj)
            // console.log(obj)
        })
        return arr
    }




    return (
        <>
            {
                onlineUsers.length &&
                <div className='pt-[56px] flex flex-col md:flex-row'>
                    {/* Mobile view */}
                    <div className='border hidden justify-between shadow-lg px-4 py-2 text-center '>
                        <div className="font-bold text-lg">Filter</div>
                        <div className="sm:hidden text-gray-700  flex text-2xl gap-4 me-3 ">
                            <BsFillSearchHeartFill className="cursor-pointer hover:text-black" onClick={() => navigate.push("/search", { scroll: false })} />
                            <BsFillBellFill className="cursor-pointer hover:text-black" />
                        </div>
                    </div>

                    {/* desktop view */}
                    <div className='border basis-2/5 xl:basis-1/4 shadow-xl md:block hidden min-h-[calc(100vh-56px)] '>filter </div>
                    <div className='border basis-5/6 p-4 py-4 flex flex-wrap justify-evenly gap-5'>

                        <Swiper card={updateMade()} currentUser={currentUser} />

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
"use client"
import React from 'react'
import { IoChatbubblesSharp, IoHome, IoSearch, IoSettings } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { useRouter } from 'next/navigation';

const BottomBar = () => {

    const navigate = useRouter()

    return (
        <div className='fixed shadow-x z-[200] flex justify-evenly md:hidden pb-5 -bottom-1 text-blue-900 bg-white  w-full pt-4 text-[1.5rem]'>
            <IoHome onClick={() => navigate.push("/profile", { scroll: false })} />
            <IoSearch onClick={() => navigate.push("/search", { scroll: false })} />
            <IoChatbubblesSharp onClick={() => navigate.push("/chat", { scroll: false })} />
            <IoIosNotifications />
            <IoSettings />
        </div>
    )
}

export default BottomBar
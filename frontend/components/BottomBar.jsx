"use client"
import React, { useState } from 'react'
import { IoChatbubblesSharp, IoHome, IoSearch, IoSettings } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { useRouter, usePathname } from 'next/navigation';
import { API, clientRoutes } from '@/utils/Api';
import { useSelector } from 'react-redux';

const BottomBar = () => {

    const path = usePathname()
    const [active, setActive] = useState(path)
    const navigate = useRouter()
    const reciever = useSelector((state => state.reciever))

    // console.log(reciever)

    const clickHandler = (url) => {
        setActive(url)
        navigate.push(url, { scroll: false })
    }

    return (
        <div className='fixed shadow-x z-[200] flex items-center justify-evenly md:hidden pb-5 -bottom-1 text-blue-900 bg-white h-[4rem] w-full pt-3 text-[1.5rem]'>
            <IoHome onClick={() => clickHandler(clientRoutes.profile)} className={`cursor-pointer p-2 text-[2.3rem] ${clientRoutes.profile === active && "bg-blue-800 rounded-full  relative text-white before:content-['Profile'] before:text-2xl before:top-0 before:absolute before:w-[3rem] before:bg-red-900 before:h-[2rem]"}`} />
            <IoSearch onClick={() => clickHandler(clientRoutes.search)} className={`cursor-pointer p-2 text-[2.3rem] ${clientRoutes.search === active && "bg-blue-800 text-white rounded-full"}`} />
            <IoChatbubblesSharp onClick={() => clickHandler(clientRoutes.chat)} className={`cursor-pointer p-2 text-[2.3rem] ${clientRoutes.chat === active && "bg-blue-800 text-white rounded-full"}`} />
            <IoIosNotifications className='cursor-pointer' />
            <IoSettings className={`cursor-pointer rounded-full  ${clientRoutes.settings === active && "bg-blue-800 text-white"}`} />
        </div>
    )
}

export default BottomBar
"use client"
import React from 'react'
import Loader from './Loader'
import Button from './Button'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import axios from 'axios'
import { API } from '@/utils/Api'

let socket = io()

const SearchedUser = ({ user, currentUser }) => {

    const requestHandler = async () => {
        let obj = { from: currentUser, to: user.email }
        const { data } = await axios.post(API.setNotification, { senderId: currentUser._id, senderName: currentUser.username, recieverId: user._id })
        if (data?.success) {
            toast.success(data?.message)
            if (data?.message !== "Request Already Sent") {
                socket.emit("request", obj)
            }
        } else {
            toast.warn(data?.message)
        }
    }

    return (
        <>
            {
                user?.username &&
                <div className="pt-[3.5rem] bg-[url(/sugarfar_bg_primary2.e8593092.jpg)] min-h-screen bg-blend-multiply bg-no-repeat bg-">
                    <div className='flex md:px-[10rem] justify-center  py-12'>
                        <div className='flex flex-wrap justify-center text-center gap-12 items-center'>
                            <div className="bg-gray-300 hover:scale-105 cursor-pointer ease-linear duration-100 transition-transform shadow-xl pt-2 max-h-[13rem] w-[12rem] rounded-xl relative">
                                <img src={"https://cdn-icons-png.flaticon.com/512/21/21104.png"} alt="imhha" className="h-full rounded-b-xl object-cover opacity-[60%] mx-auto" />
                                <div className="bg-gray-700 bg-opacity-[80%] rounded-b-xl absolute bottom-0 py-1 text-center text-white w-full text-xs">
                                    <p className="font-medium">{user.username}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className='text-gray-200'>
                                <div className='mb-12'>
                                    <p className="text-4xl font-bold">{user.username}</p>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <button type='button' className='bg-green-600 mb-3 w-[13rem] px-12 py-2 md:me-5 rounded-xl text-lg' onClick={requestHandler}>Connect</button>
                                    <Button type={"button"} value={"Send Message"} styles={"bg-blue-800 w-[13rem] px-10 py-2 rounded-xl text-lg"} />
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            }
            {
                !user?.username &&
                <Loader />
            }
        </>
    )
}

export default SearchedUser
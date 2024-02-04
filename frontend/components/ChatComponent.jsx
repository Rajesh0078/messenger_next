"use client"
import { getMsg, postMsg } from '@/utils/routes';
import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline, IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { BiSolidPhoneCall, BiSolidSend, BiSolidVideo } from "react-icons/bi";
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

let socket;

const ChatComponent = ({ to, currentUser, isNext, setIsNext }) => {

    const { register, handleSubmit, reset } = useForm()
    const [chatList, setChatList] = useState([])


    const sendMsgHandler = async ({ text }) => {
        if (text && currentUser?.email) {
            let msg = {
                text: text,
                from: currentUser?.email,
                to: to?.email,
                time: new Date().getTime(),
                receiverName: to?.username
            }
            socket.emit("send-message", msg)
            reset({ text: "" })
            await postMsg(msg)
        }
        else {
            console.log("not done", currentUser)
        }
    }


    function socketInitializer() {
        fetch("/api/socket");

        socket = io();

        // socket.emit("add-user", currentUser.email)

        socket.on("receive-message", async (data) => {
            if (data.from === currentUser.email) {
                setChatList((pre) => [...pre, data]);
            }
            if ((data.to === currentUser.email)) {
                if (data.from === to.email) {
                    setChatList((pre) => [...pre, data]);
                } else {
                    toast.info("Message from " + data.receiverName)
                }
            }

        });

    }

    useEffect(() => {

        socketInitializer();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [to])


    const createDataSource = () => {
        let arr = []
        chatList.forEach((i) => {
            let obj = {
                ...i,
                ['type']: typeof i.text === "string" && "text",
                ['position']: currentUser?.email === i.from ? "right" : "left",
                ['date']: new Date(i.time),
                ['hrs']: new Date(i.time).getHours(),
                ['min']: new Date(i.time).getMinutes()
            }
            arr.push(obj)
        })
        return arr
    }

    const messages = async () => {
        const data = await getMsg(currentUser?.email, to?.email)
        if (data?.success) {
            setChatList(data.data)
        }
    }

    useEffect(() => {
        setChatList([])
        messages()
    }, [to])

    return (
        <>
            {
                to && to?.email ? <div className={`w-full ${isNext ? "block" : "hidden"} md:block pt-[56px] shadow-xl text-white sm:w-[calc(100vw-16rem)] h-dvh md:w-[calc(100vw-20rem)]`}>
                    <div className='px-3 py-2 flex justify-between items-center bg-slate-50 backdrop-blur-md bg-opacity-[50%] shadow'>
                        <div className='flex items-center gap-2 text-black'>
                            <IoArrowBackOutline className='text-2xl cursor-pointer' onClick={() => setIsNext(false)} />
                            <div className='w-[3rem] h-[3rem] text-black rounded-full flex text-2xl shadow bg-white'><p className='m-auto'>{to?.username.charAt(0)}</p></div>
                            {to.username}
                        </div>
                        <div className='text-4xl flex gap-2'>
                            <BiSolidPhoneCall className='bg-white shadow text-gray-800 px-2 rounded-full cursor-pointer' />
                            <BiSolidVideo className='bg-white shadow text-gray-800 px-2 rounded-full cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex flex-col h-[calc(100vh-(180px))]'>
                        <div className=' text-black h-[calc(100%-60px)] overflow-y-auto chat-scroll flex flex-col-reverse'>

                            <div className='w-full '>
                                <div className='flex flex-col h-full px-5 pt-1'>
                                    {
                                        createDataSource().map((i, inx) => {
                                            return (
                                                <div key={inx} className={`${i.position === "right" ? "self-end text-white !bg-blue-800 rounded-l-3xl rounded-r-[4px]  ps-4 pe-2" : "self-start ps-2 pe-3 rounded-r-3xl rounded-l-[4px]"} max-w-[84%] sm:max-w-[70%]  md:max-w-[45%] bg-white   my-[1px]`}>
                                                    <div className='flex'>
                                                        <p className='py-2 '>{i.text}</p>
                                                        {i.position === "right" ?
                                                            <p className='text-[10px] mt-[1.9px] self-end ms-3 min-w-[4.2rem] text-right'>
                                                                {i.hrs > 12 ? (i.hrs - 12 + ":" + i.min + " pm") : i.hrs + ":"}
                                                                <span className='ms-1 text-[1.2rem]'>
                                                                    {
                                                                        i?.read ?
                                                                            <IoCheckmarkDoneSharp className='inline' />
                                                                            :
                                                                            <IoCheckmarkSharp className='inline ' />
                                                                    }
                                                                </span>
                                                            </p> :
                                                            <p className='text-[10px] self-end ms-4 mb-1'>
                                                                {i.hrs > 12 ? (i.hrs - 12 + ":" + i.min + " pm") : i.hrs + ":"}

                                                            </p>
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className=' w-full px-3 sm:px-4 py-2 '>
                            <form onSubmit={handleSubmit(sendMsgHandler)} className='relative'>
                                <input type='text' {...register("text")} placeholder='send message' autoComplete='off' className='text-lg bg-white text-black shadow-x outline-none w-full px-4 py-2 rounded-full' />
                                <button className='absolute top-[50%] -translate-y-[50%] right-[1.2rem] sm:right-[.8rem] text-2xl text-blue-900' type='submit' ><BiSolidSend /></button>
                            </form>
                        </div>
                    </div>
                    {/* <MessageComponent toEmail={to?.email} currentUser={currentUser} chatList={chatList} setChatList={setChatList} /> */}

                </div> :
                    <div className='flex w-full justify-center pt-[56px] items-center h-dvh sm:w-[calc(100vw-16rem)] md:w-[calc(100vw-20rem)]'>
                        <span > "SugarFar"</span>
                    </div>
            }
        </>
    )
}

export default ChatComponent
"use client"
import { getMsg } from '@/utils/routes';
import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline, IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { BiSolidPhoneCall, BiSolidSend, BiSolidVideo } from "react-icons/bi";
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import ChatTypingAnimation from './ChatTypingAnimation';

let socket;

const ChatComponent = ({ to, currentUser, isNext, setIsNext }) => {

    const { register, handleSubmit, reset, formState: { dirtyFields }, watch } = useForm()
    const [chatList, setChatList] = useState([])
    const [msgList, setMsgList] = useState([])
    const [isTyping, setIsTyping] = useState(false)



    const sendMsgHandler = async ({ text }) => {
        if (text && currentUser?.email) {
            let msg = {
                text: text,
                message_from: currentUser?.email,
                message_to: to?.email,
                time: new Date().getTime(),
                receiverName: currentUser?.username
            }
            reset({ text: "" })
            socket.emit("send-message", msg)
            // }
            // await postMsg(sg)
            // console.log(data)
        }
        else {
            console.log("not done", currentUser)
        }
    }


    // useEffect(() => {
    //     const updateMSG = async () => {
    //         const data = await getMsg()
    //         const arr = data.data
    //         const filtered = arr.filter((i) => ((i.message_from === currentUser.id) && (i.message_to === to.id)) || ((i.message_from === to.id) && (i.message_to === currentUser.id)))
    //         setMsgList(filtered)
    //     }

    //     updateMSG()
    // }, [to])

    useEffect(() => {
        socket = io();
        if (watch("text")) {
            socket.emit("typing", { decision: true, from: currentUser.id, to: to.id })
        } else if (watch("text").length === 0) {
            socket.emit("typing", { decision: false, from: currentUser.id, to: to.id })
        }
    }, [watch("text")])

    function socketInitializer() {
        fetch("/api/socket");

        socket = io();

        socket.on("typing_decision", (decision) => {
            if (decision.decision) {
                if (decision.to === currentUser.id) {
                    setIsTyping(decision.decision)
                }
            } else {
                setIsTyping(decision.decision)
            }
        })

        socket.on("receive-message", async (data) => {
            if (data.message_from === currentUser.email) {
                setMsgList((pre) => [...pre, data]);
                // console.log(data)
            }
            if ((data.message_to === currentUser.email)) {
                if (data.message_from === to.email) {
                    setMsgList((pre) => [...pre, data]);
                    // console.log(data)
                } else {
                    toast.info("Message from " + data.receiverName)
                }
            }

        });
    }

    // console.log(msgList)


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
        msgList.forEach((i) => {
            let obj = {
                ...i,
                ['type']: typeof i.text === "string" && "text",
                ['position']: currentUser?.email === i.message_from ? "right" : "left",
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
                to && to?.email ? <div className={`w-full ${isNext ? "block" : "hidden"} md:block pt-[56px] shadow-xl text-white sm:w-[calc(100vw-16rem)] h-dvh md:w-[calc(100vw-0rem)]`}>
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
                    <div className='flex flex-col h-[calc(100vh-(180px))] md:h-[calc(100vh-(125px))]'>
                        <div className=' text-black h-[calc(100%-60px)] overflow-y-auto chat-scroll flex flex-col-reverse'>
                            <div className='w-full '>
                                <div className='flex flex-col h-full px-5 pt-1'>
                                    {
                                        createDataSource().map((i, inx) => {
                                            return (
                                                <div key={inx} className={`${i.position === "right" ? "self-end text-white !bg-blue-800 rounded-l-3xl rounded-r-[4px]  ps-4 pe-2" : "self-start ps-2 pe-3 rounded-r-3xl rounded-l-[4px]"} max-w-[84%] sm:max-w-[70%]  md:max-w-[45%] bg-white my-[1px]`}>
                                                    <div className='flex'>
                                                        <p className='py-2 '>{i.text}</p>
                                                        {i.position === "right" ?
                                                            <p className='text-[10px] mt-[1.9px] self-end ms-3 min-w-[4.2rem] text-right'>
                                                                {i.hrs > 12 ? (i.hrs - 12 + ":" + i.min + " pm") : i.hrs + ":" + i.min + " am"}
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
                                                                {i.hrs > 12 ? (i.hrs - 12 + ":" + i.min + " pm") : i.hrs + ":" + i.min + " am"}
                                                            </p>
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* typing animation */}
                                    {isTyping && <ChatTypingAnimation />}

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
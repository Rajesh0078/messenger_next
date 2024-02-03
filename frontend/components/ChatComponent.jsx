"use client"
import { getMsg, getReciever, postMsg } from '@/utils/routes';
import React, { useEffect, useRef, useState } from 'react'
import { MessageList } from 'react-chat-elements'
import { useForm } from 'react-hook-form';
import { BiSolidPhoneCall, BiSolidSend, BiSolidVideo } from "react-icons/bi";
import { io } from 'socket.io-client';

let socket;

const ChatComponent = ({ to, currentUser, }) => {



    const { register, handleSubmit, reset } = useForm()
    const [chatList, setChatList] = useState([])

    const messageListReferance = React.createRef();

    const sendMsgHandler = async ({ text }) => {
        if (text && currentUser?.email) {
            let msg = {
                text: text,
                from: currentUser?.email,
                to: to?.email,
                time: new Date().getTime()
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

        socket.emit("add-user", currentUser.email)

        socket.on("receive-message", async (data) => {
            if (data.from === currentUser.email) {
                setChatList((pre) => [...pre, data]);
            }
            if ((data.to === currentUser.email) && (data.from === to.email)) {
                setChatList((pre) => [...pre, data]);
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
                ['date']: new Date(i.time)
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
                to && to?.email ? <div className='w-full pt-[56px] shadow-xl text-white sm:w-[calc(100vw-16rem)] h-dvh md:w-[calc(100vw-20rem)]'>
                    <div className='px-6 py-2 flex justify-between items-center bg-gray-500'>
                        <div className='flex items-center gap-3'>
                            <div className='w-[3rem] h-[3rem] text-black rounded-full flex text-2xl bg-white'><p className='m-auto'>{to?.username.charAt(0)}</p></div>
                            {to.email}
                        </div>
                        <div className='text-4xl flex gap-2'>
                            <BiSolidPhoneCall className='bg-white text-gray-800 px-2 rounded-full cursor-pointer' />
                            <BiSolidVideo className='bg-white text-gray-800 px-2 rounded-full cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex flex-col h-[calc(100vh-(120px))]'>
                        <div className=' text-black h-[calc(100%-60px)]'>
                            <MessageList
                                referance={messageListReferance}
                                className='message-list'
                                lockable={true}
                                toBottomHeight={'0%'}
                                dataSource={createDataSource()}
                            />
                        </div>
                        <div className=' w-full px-3 sm:px-4 py-2 '>
                            <form onSubmit={handleSubmit(sendMsgHandler)} className='relative'>
                                <input type='text' {...register("text")} placeholder='send message' autoComplete='off' className='text-lg bg-gray-900 text-white shadow-x outline-none w-full px-4 py-2 rounded-full' />
                                <button className='absolute top-[50%] -translate-y-[50%] right-[1.2rem] sm:right-[2rem] text-2xl text-gray-200' type='submit' ><BiSolidSend /></button>
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
import React, { createRef, useEffect } from 'react'
import { MessageList } from 'react-chat-elements'
import { useForm } from 'react-hook-form';
import { io } from 'socket.io-client';
import { BiSolidSend, } from "react-icons/bi";
import { postMsg } from '@/utils/routes';


let socket;

const MessageComponent = ({ currentUser, toEmail, chatList, setChatList }) => {

    const messageListReferance = createRef();

    const { register, handleSubmit, reset } = useForm()

    const sendMsgHandler = async ({ text }) => {
        if (text && currentUser?.email) {
            let msg = {
                text: text,
                from: currentUser?.email,
                to: toEmail,
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

    async function socketInitializer() {
        await fetch("/api/socket");

        socket = io();

        socket.on("receive-message", (data) => {
            if (data.to === toEmail) {
                setChatList((pre) => [...pre, data]);
            }
        });
    }

    useEffect(() => {
        socketInitializer()

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [])


    return (
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
    )
}

export default MessageComponent
"use client"
import { getMsg, postMsg } from '@/utils/routes';
import React, { useEffect, useState } from 'react'
import { MessageList } from 'react-chat-elements'
import { useForm } from 'react-hook-form';
import { BiSolidPhoneCall, BiSolidSend, BiSolidVideo } from "react-icons/bi";



const ChatComponent = ({ to, currentUser }) => {

    const { register, handleSubmit, reset } = useForm()
    const [chatList, setChatList] = useState([])

    const messageListReferance = React.createRef();
    // const socket = io.connect(baseUrl)

    const sendMsgHandler = async ({ text }) => {
        if (text && user?.success) {
            let msg = {
                text: text,
                from: user?.user.email,
                to: "a@gmail.com",
                time: new Date().getTime()
            }
            await postMsg(msg)
            // socket.emit("add-msg", msg)
            reset({ text: "" })
        }
        else {
            console.log("not done", user)
        }
    }

    const createDataSource = () => {
        let arr = []
        chatList.forEach((i) => {
            let obj = {
                ...i,
                ['type']: typeof i.text === "string" && "text",
                ['position']: currentUser?.user.email === i.from ? "right" : "left",
                ['date']: new Date(i.time)
            }
            arr.push(obj)
        })
        return arr
    }

    // console.log(currentUser.user)
    const messages = async () => {
        const data = await getMsg(currentUser?.user.email, to?.email)
        if (data?.success) {
            // console.log(data)
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
                to?.email ? <div className='w-full shadow-xl text-white sm:w-[calc(100vw-16rem)] h-full md:w-[calc(100vw-20rem)]'>
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
                    <div className='flex flex-col h-[calc(100vh-112px)] sm:h-[calc(100vh-112px)]'>
                        <div className='h-[calc(100%-57px)] sm:h-[calc(100%-57px)] text-black py-2'>
                            <MessageList
                                referance={messageListReferance}
                                className='message-list'
                                lockable={true}
                                toBottomHeight={'0%'}
                                dataSource={createDataSource()} />

                        </div>
                        <div className=' w-full px-3 sm:p-4  '>
                            <form onSubmit={handleSubmit(sendMsgHandler)} className='relative'>
                                <input type='text' {...register("text")} placeholder='send message' autoComplete='off' className='text-lg bg-gray-900 text-white shadow-x outline-none w-full px-4 py-2 rounded-full' />
                                <button className='absolute top-[50%] -translate-y-[50%] right-[1.2rem] sm:right-[2rem] text-2xl text-gray-200' type='submit' ><BiSolidSend /></button>
                            </form>
                        </div>
                    </div>

                </div> :
                    <div className='flex w-full justify-center items-center h-[calc(100vh-(48px))] sm:w-[calc(100vw-16rem)] md:w-[calc(100vw-20rem)]'>
                        <span> "SugarFar"</span>
                    </div>
            }
        </>
    )
}

export default ChatComponent
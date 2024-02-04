"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ChatItem } from 'react-chat-elements'
import ChatComponent from './ChatComponent'
import { useDispatch } from 'react-redux'
import { updateReciever, updateUser } from '@/Store/features/toReducer'
import { io } from 'socket.io-client'


let socket;

const Home = ({ allUsers, currentUser }) => {

    const [sendTo, setSendTo] = useState(null)
    const [isNext, setIsNext] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateUser(currentUser))
        dispatch(updateReciever(sendTo))
    }, [currentUser, sendTo])

    function socketInitializer() {
        fetch("/api/socket");

        socket = io();

        socket.on("connect", () => {
            socket.emit("add-user", currentUser.email)
        })

        socket.on("user-status", ({ userId, status }) => {
            if (userId !== currentUser?.email) {
                // toast.info(userId + " is " + status)
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
        <div className='w-full  min-h-screen'>
            <div className='flex h-full'>
                <div className={`${isNext ? "hidden" : ""} block h-dvh pt-[56px] z-[10] w-full md:w-[20rem] overflow-y-auto chat-scroll bg-white `}>
                    {
                        allUsers?.success && allUsers?.users.filter(user => user.username !== currentUser.username).map((i, inx) => {

                            return (
                                <ChatItem
                                    key={inx}
                                    // avatar={'https://facebook.github.io/react/img/logo.svg'}
                                    alt={i.username}
                                    title={i.username}
                                    subtitle={'Latest msg'}
                                    date={new Date().setDate(new Date().getDate() - 62)}
                                    unread={2}
                                    onClick={() => { setSendTo(i); dispatch(updateReciever(i)); setIsNext(true) }}
                                />
                            )
                        })
                    }
                </div>

                {sendTo?.email &&
                    <ChatComponent to={sendTo} currentUser={currentUser} isNext={isNext} setIsNext={setIsNext} />
                }
            </div>
        </div>
    )
}

export default Home
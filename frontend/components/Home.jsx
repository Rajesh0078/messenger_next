"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ChatItem } from 'react-chat-elements'
import ChatComponent from './ChatComponent'
import { useDispatch } from 'react-redux'
import { updateReciever, updateUser } from '@/Store/features/toReducer'

const Home = ({ allUsers, currentUser }) => {

    const [sendTo, setSendTo] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateUser(currentUser))
        dispatch(updateReciever(sendTo))
    }, [currentUser, sendTo])


    return (
        <div className='w-full  min-h-screen'>
            <div className='flex h-full'>
                <div className='hidden sm:block h-dvh pt-[56px] sm:w-[16rem] md:w-[20rem] overflow-y-auto chat-scroll bg-white '>
                    {
                        allUsers?.success && allUsers?.users.filter(user => user.username !== currentUser.username).map((i, inx) => {

                            return (
                                <ChatItem
                                    key={inx}
                                    avatar={'https://facebook.github.io/react/img/logo.svg'}
                                    alt={i.username}
                                    title={i.username}
                                    subtitle={'Latest msg'}
                                    date={new Date().setDate(new Date().getDate() - 62)}
                                    unread={2}
                                    onClick={() => { setSendTo(i); dispatch(updateReciever(i)) }}
                                />
                            )
                        })
                    }
                </div>

                {sendTo?.email &&
                    <ChatComponent to={sendTo} currentUser={currentUser} />
                }
            </div>
        </div>
    )
}

export default Home
"use client"

import ChatComponent from '@/components/ChatComponent'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navbar, ChatItem, MessageBox } from 'react-chat-elements'
import { useSelector } from 'react-redux'

const page = () => {

    const user = useSelector((state) => state.user?.user)
    const allUsers = useSelector((state) => state.alluser)

    const [sendTo, setSendTo] = useState(null)

    useEffect(() => {
        // console.log(sendTo)
    }, [sendTo])

    return (
        <>
            {user?.success &&
                <div className='w-full'>
                    <Navbar
                        className='!bg-gray-800 text-white !px-[10%] !py-3'
                        // type='dark'
                        left={
                            <div>Messanger</div>
                        }
                        right={
                            user?.success && <div>{user?.user.username}</div>
                        }
                    />
                    <div className='flex'>
                        <div className='hidden sm:block sm:w-[16rem] md:w-[20rem] overflow-y-auto chat-scroll bg-white h-[calc(100vh-(48px))]'>
                            {
                                allUsers?.user && allUsers?.user.map((i, inx) => {
                                    return (
                                        <ChatItem
                                            key={inx}
                                            avatar={'https://facebook.github.io/react/img/logo.svg'}
                                            alt={i.username}
                                            title={i.username}
                                            subtitle={'Latest msg'}
                                            date={new Date().setDate(new Date().getDate() - 62)}
                                            unread={2}
                                            onClick={() => setSendTo(i)}
                                        />
                                    )
                                })
                            }
                        </div>

                        <ChatComponent to={sendTo} currentUser={user} />
                    </div>
                </div>
            }
            {
                !user?.success && <Loader />
            }
        </>
    )
}

export default page
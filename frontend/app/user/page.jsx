"use client"
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from 'react-redux'
import "swiper/css";
import 'swiper/css/free-mode';
import { BiSolidSend } from "react-icons/bi";
import { allUsers, getMsg, postMsg } from '@/utils/routes';
import { useForm } from "react-hook-form"

import { io } from "socket.io-client"
import { baseUrl } from '@/utils/Api';

const page = () => {

    const { register, handleSubmit, reset } = useForm()
    const user = useSelector((state) => state.user.user)
    const [messegaes, setMessages] = useState([])
    const [users, setAllUsers] = useState([])
    const [displayedToday, setDisplayedToday] = useState([]);

    const socket = io.connect(baseUrl)


    const allMsgs = async () => {
        if (user?.user) {
            const data = await getMsg(user?.user.email, "a@gmail.com")
            if (data?.success) {
                setMessages(data.data)
            }
        }
    }

    const sendMsgHandler = async ({ text }) => {
        if (text && user?.success) {
            let msg = {
                text: text,
                from: user?.user.email,
                to: "a@gmail.com",
                time: new Date().getTime()
            }
            await postMsg(msg)
            socket.emit("add-msg", msg)
            reset({ text: "" })
        }
        else {
            console.log("not done", user)
        }
    }


    useEffect(() => {
        socket.on("get-msg", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.on("disconnect")
            socket.off("get-msg");
        }
    }, [])

    useEffect(() => {
        allMsgs()

    }, [user?.user])

    return (
        <>

            <Layout>
                <section className='pt-[3.5rem] min-h-screen relative'>
                    {/* Mobile view */}
                    <nav className='bg-white p-2 sm:hidden shadow-lg'>
                        <Swiper className="mySwiper "
                            breakpoints={{
                                250: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                                320: {
                                    slidesPerView: 5,
                                    spaceBetween: 20,
                                },
                                420: {
                                    slidesPerView: 6,
                                    spaceBetween: 20,
                                }
                            }}
                            slidesPerView={3}
                            spaceBetween={20}
                        >
                            {/* {
                                images.map((image, inx) => {
                                    return (
                                        <SwiperSlide className='rounded-full !h-[3.5rem] min-w-[3.5rem] ' key={inx}>
                                            <img src={image.image} alt={image.name} className='object-top select-none w-full h-full object-cover rounded-full' />
                                            <p>{image.name}</p>
                                        </SwiperSlide>
                                    )
                                })
                            } */}

                            {
                                users.length ? users.map((user, inx) => {

                                    return (
                                        <SwiperSlide className='bg-gray-200 rounded-full  !h-[3.5rem] text-center min-w-[3.5rem] !flex justify-center items-center' key={inx}>
                                            <p className='text-2xl border-black my-auto'>{user.username.charAt(0)}</p>
                                            {/* <img src={image.image} alt={image.name} className='object-top select-none w-full h-full object-cover rounded-full' />
                                            <p>{image.name}</p> */}
                                        </SwiperSlide>
                                    )
                                }) : <div className='h-[3.5rem]'></div>
                            }
                        </Swiper>
                    </nav>


                    {/* chat section */}
                    <div className='flex chat'>
                        <section className='hidden sm:block min-w-[18rem] shadow-x bg-white'>
                            hi
                        </section>
                        <section className='relative w-full ' >
                            <div className='absolute w-full p-2 sm:p-4 bottom-0 '>
                                <form action="" onSubmit={handleSubmit(sendMsgHandler)}>
                                    <input type='text' {...register("text")} placeholder='send message' autoComplete='off' className='text-lg shadow-x outline-none w-full px-4 py-2 rounded-full' />
                                    <button className='absolute top-[50%] -translate-y-[50%] right-[1.2rem] sm:right-[2rem] text-2xl text-blue-900' type='submit' ><BiSolidSend /></button>
                                </form>
                            </div>
                            <div className='px-4 flex flex-col-reverse overflow-y-auto chat-scroll' style={{ height: "calc(100% - 68px)" }}>
                                <div className="pt-2">
                                    {

                                        messegaes.length && messegaes.map((i, ins) => {
                                            const timeString = i.time;
                                            const dateTime = new Date(timeString);
                                            const dateComponent = dateTime.toISOString().split('T')[0];
                                            const timeComponent = dateTime.toTimeString().split(' ')[0];

                                            const current = new Date()
                                            const currentDate = current.toISOString().split('T')[0]
                                            const showToday = currentDate === dateComponent && !displayedToday.includes(currentDate);

                                            if (showToday) {
                                                setDisplayedToday((prev) => [...prev, currentDate]);
                                            }


                                            return (
                                                <div key={ins} className={` flex ${i.from === user?.user?.email ? "justify-end" : "justify-start"}`}>
                                                    {showToday && <div className='text-sm'>Today</div>}
                                                    <div className={`px-4 break-words text-sm  my-1  py-[.5rem] max-w-[60%] ${i.from === user?.user?.email ? " text-white rounded-3xl bg-blue-800 text-right" : "text-left bg-white rounded-3xl"} `}>{i.text}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default page
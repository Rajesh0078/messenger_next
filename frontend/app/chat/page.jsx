"use client"
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules"
import { useSelector } from 'react-redux'
import "swiper/css";
import 'swiper/css/free-mode';
import { BiSolidSend } from "react-icons/bi";
import { allUsers, getMsg, postMsg } from '@/utils/routes';
import axios from 'axios';
import { API } from '@/utils/Api';
import { Socket, io } from "socket.io-client"

const page = () => {
    const user = useSelector((state) => state.user.user)
    const [value, setValue] = useState('')
    const [data, setData] = useState([])
    const [messegaes, setMessages] = useState([])

    const socket = io.connect('http://localhost:8080')

    const images = [
        { name: "Elisa", image: "https://vice.app/storage/images/RDLWNy35vuGPusZZO2kp42K1G0oWKW0GtIUOhnJr.png", premium: true },
        { name: "Test 2", image: "https://vice.app/storage/images/PyRjecVLWWmuRkxO8LYTfZ2Njy9pE6XXjDy4uRfR.png", premium: true },
        { name: "Test 3", image: "https://vice.app/storage/images/qhD21cE9RUEETRW1z9q4CZkGXnQSXom1oj7OWXNk.png", premium: false },
        { name: "Test 4", image: "https://vice.app/storage/images/9oMJhTevhClWevsDmZ0VXeWvPH0h3oTz3PdgmIUe.png", premium: true },
        { name: "Test 5", image: "https://vice.app/storage/images/svWsol889IkeGIeUSZQ41rJYANTE8OsqDvNYqrMQ.png", premium: false },
        { name: "Test 6", image: "https://vice.app/storage/images/tf3ze97GKIH1fXI19ijGvFEmr5PFPo0KJR6pES9v.png", premium: false },
        { name: "Test 7", image: "https://vice.app/storage/images/wByvRvg6vaTkeMiMsjkcz5QTGYD98Y9gO2OCo1I0.png", premium: true },
        { name: "Test 8", image: "https://vice.app/storage/images/uRE4U5U9t0caHucfWx7SMS1Yag763u4cTIL6bTl2.png", premium: true },
    ]

    const getUsers = async () => {
        const data = await allUsers()
        console.log(data)
    }


    const changeHandler = (e) => {
        const { value } = e.target
        setValue(value)
    }

    const sendMsgHandler = async () => {
        if (value && user?.success) {
            let msg = {
                text: value,
                from: user?.user.email,
                to: "a@gmail.com"
            }
            await postMsg(msg)
            socket.emit("add-msg", msg)
            setValue("")
        }
        else {
            console.log("not done", user)
        }
    }
    // msg()

    // const msg = async () => {
    //     const { data } = await axios.post(API.getMsg, { email: "a@gmail.com" })
    //     if (data.data.length) {
    //         setData(data.data)
    //     }
    // }

    useEffect(() => {
        socket.on("get-msg", (message) => {
            setMessages([...messegaes, message])
        })
        return () => {
            socket.on("disconnect")
        }
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    // useEffect(() => {
    //     msg()
    //     // console.log(data)
    // }, [value])

    // console.log(data)

    return (
        <>

            {/* {(typeof window !== "undefined") && (!user?.isLoading) ? */}
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
                            {
                                images.map((image, inx) => {
                                    return (
                                        <SwiperSlide className='rounded-full !h-[3.5rem] min-w-[3.5rem] ' key={inx}>
                                            <img src={image.image} alt={image.name} className='object-top select-none w-full h-full object-cover rounded-full' />
                                            <p>{image.name}</p>
                                        </SwiperSlide>
                                    )
                                })
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
                                <input type="text" name='text' id='text' value={value} placeholder='send message' autoComplete='off' className='text-lg shadow-x outline-none w-full px-4 py-2 rounded-full' onChange={changeHandler} />
                                <button className='absolute top-[50%] -translate-y-[50%] right-[1.2rem] sm:right-[2rem] text-2xl text-blue-900' onClick={sendMsgHandler}><BiSolidSend /></button>
                            </div>
                            <div className='px-4 flex flex-col-reverse overflow-y-auto chat-scroll' style={{ height: "calc(100% - 68px)" }}>
                                <div className="pt-2">
                                    {
                                        messegaes.length && messegaes.map((i) => {
                                            return (
                                                <div key={i._id} className={`flex ${i.from === user?.user?.email ? "justify-end" : "justify-start"}`}>
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
            {/* :
            <Loader /> */}
            {/* } */}
            {/* } */}
        </>
    )
}

export default page
"use client"
import { removeToken } from "@/utils/routes"
import { useRouter } from "next/navigation"
import { destroyCookie } from "nookies"
import { Avatar, Button, Dropdown } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { MdLogout, MdPerson, MdSettings } from "react-icons/md"
import { BsFillSearchHeartFill, BsFillBellFill } from "react-icons/bs";
import { toast } from "react-toastify"
import { io } from "socket.io-client"
import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "@/utils/Api"

let socket;

const Header = ({ user }) => {

    const navigate = useRouter()

    const [notfications, setNotifications] = useState([])

    const logoutHandler = () => {
        destroyCookie(null, "token")
        removeToken()
        toast.success("Logout success")
        navigate.push("/", { scroll: false })
    }



    useEffect(() => {
        async function notify() {
            const { data } = await axios.post(API.getNotification, { id: user._id })
            if (data?.success) {
                setNotifications(data.notifications)
            }
        }

        notify()
    }, [])

    const items = [
        {
            label: <span onClick={() => navigate.push('/profile', { scroll: false })} className="cursor-pointer font-medium text-md flex items-center"><MdPerson className="inline text-xl me-2" />Profile</span>,
            key: '0',
        },
        {
            label: <span className="cursor-pointer text-md font-medium "><MdSettings className="inline text-xl me-2" />Settings</span>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label:
                <span onClick={logoutHandler} className="cursor-pointer text-sm font-regular "><MdLogout className="inline text-xl me-2" />Logout</span>,
            key: '3',
        },
    ];

    function socketInitialization() {
        fetch('/api/socket')

        socket = io()


        socket.on("notify-request", (obj) => {
            if (user.email === obj.to) {
                setNotifications(prev => {
                    if (!prev.some(item => item.from === obj.from)) {
                        return [...prev, obj];
                    }
                    return prev;
                })
            }
        })
    }

    console.log(notfications)

    useEffect(() => {
        socketInitialization()

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [])

    return (
        <header className="bg-blue-900 text-white py-4 px-6 lg:px-[8%] z-[200] fixed top-0 left-0 w-full ">
            <div className="relative">
                <p className="font-medium" onClick={() => navigate.push("/chat", { scroll: false })}>Messanger</p>
                <div className="absolute top-[50%] -translate-y-[50%] right-0 flex items-center">
                    <div className="hidden sm:flex text-2xl  gap-4 me-3">
                        <BsFillSearchHeartFill className="cursor-pointer" onClick={() => navigate.push("/search", { scroll: false })} />
                        <div className="relative">
                            <BsFillBellFill className="cursor-pointer" />
                            <span className="absolute h-5 w-5 rounded-full text-sm text-center -top-3  -right-2 bg-sky-500">{notfications.length && notfications.length}</span>
                        </div>
                    </div>
                    <Dropdown
                        menu={{
                            items
                        }}
                        trigger={["click"]}
                        placement="bottomLeft"
                    >
                        <Button className="!flex items-center !text-white">
                            <Avatar icon={<UserOutlined />} className="!me-2 !bg-white !text-black" />
                            <span className="text-[1.1rem]">
                                {user?.username}
                            </span>
                        </Button>
                    </Dropdown>


                </div>
            </div>
        </header >
    )
}

export default Header
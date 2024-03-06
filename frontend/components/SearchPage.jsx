"use client"

import React, { useEffect, useState } from "react"
import Loader from "./Loader"
import { io } from "socket.io-client";
import { BsFillBellFill, BsFillSearchHeartFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
// import Swiper from "./Swiper";
import SwipeCard from './SwipeCard';
import { toast } from "react-toastify";
import ChatTypingAnimation from "./ChatTypingAnimation";
let socket;

const SearchPage = ({ currentUser, users }) => {

  const navigate = useRouter()
  const [onlineUsers, setOnlineUsers] = useState(users.users)
  const [showLoader, setShowLoader] = useState(true)
  // const [currentIndex, setCurrentIndex] = useState(0)

  function updateUsers(email, status) {
    const updatedUsers = users.users.map(user => user.email === email ? { ...user, online: status } : user);
    setOnlineUsers(updatedUsers);
  }

  function socketInitializer() {
    fetch("/api/socket");

    socket = io();

    socket.on("connect", () => {
      socket.emit("add-user", currentUser.email)
    })

    socket.on("user-status", ({ userId, status }) => {
      if (userId !== currentUser?.email) {
        updateUsers(userId, status)
      }
    });
  }

  useEffect(() => {
    setShowLoader(false)
    socketInitializer();

    socket.on("connect", () => {
      socket.emit("add-user", currentUser.email)
    })

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  const swiped = (direction, character) => {
    if (direction === "left") {
      toast.warn("Swiped Left")
      console.log("left", character)
    } else if (direction === "right") {
      toast.success("Swiped Right")
      console.log("right", character)
    }
  }
  const outOfFrame = (character, index) => {
    let updatedCharacters = onlineUsers.filter((chr) => {
      if (chr.id === character.id) {
        return false
      } else {
        return true
      }
    })
    setOnlineUsers(updatedCharacters)
  }
  const handleSwipe = (chr, direction, index) => {
    if (direction === 'right') {
      // Handle right swipe
      swiped(direction, chr)
      outOfFrame(chr, index)
    } else if (direction === 'left') {
      // Handle left swipe
      swiped(direction, chr)
      outOfFrame(chr, index)
    }
  };

  const updateMade = () => {
    const images = [
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/117/01HN4ZWGWPZP65ZDD8JGKAXGMQ.jpg", premium: true },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/113/01HN36GTS9RDAVS3MW0AV1DVYR.png", premium: true },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/121/01HN4ZXK02T1GA03CN8BQW5WGF.jpg", premium: false },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/113/01HN36GTS9RDAVS3MW0AV1DVYR.png", premium: true },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/129/01HN500MXX7ZXGQFMEX3NGXXXK.jpg", premium: false },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/133/01HN501K7HWTTMJABKWCWSDNB1.jpg", premium: false },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/113/01HN36GTS9RDAVS3MW0AV1DVYR.png", premium: true },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/176/01HN50P8VDWDDGJKQF9JEJ209K.jpg", premium: true },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/121/01HN4ZXK02T1GA03CN8BQW5WGF.jpg", premium: true },
      { image: "https://vice-app.nyc3.digitaloceanspaces.com/profile/173/01HN50M87R65X9T9PC08045CTF.jpg", premium: true },
    ]
    let arr = []
    onlineUsers.forEach((user, i) => {
      let obj = { ...user, imgUrl: (i - 1 < 0) ? images[images.length - i - 1]?.image : images[(i - 1)]?.image }
      arr.push(obj)
      // console.log(obj)
    })
    return arr
  }

  return (
    <>
      {showLoader && <Loader />}
      {
        onlineUsers.length &&
        <div className='pt-[56px] w-full flex flex-col md:flex-row'>
          {/* Mobile view */}
          <div className='border hidden justify-between shadow-lg px-4 py-2 text-center '>
            <div className="font-bold text-lg">Filter</div>
            <div className="sm:hidden text-gray-700  flex text-2xl gap-4 me-3 ">
              <BsFillSearchHeartFill className="cursor-pointer hover:text-black" onClick={() => navigate.push("/search", { scroll: false })} />
              <BsFillBellFill className="cursor-pointer hover:text-black" />
            </div>
          </div>

          {/* desktop view */}
          <div className='border basis-2/5 xl:basis-1/4 shadow-xl md:block hidden min-h-[calc(100vh-56px)] '>
            Filter
            {/* <ChatTypingAnimation /> */}
          </div>
          <div className='border basis-5/6 p-4 py-4 flex flex-wrap justify-evenly gap-5'>
            {/* <Swiper characters={updateMade()} currentUser={currentUser} outOfFrame={outOfFrame} currentIndex={currentIndex} /> */}
            <>
              <div className='w-full flex h-full items-center justify-center relative overflow-hidden transition-opacity duration-[.1s] ease-in-out'>
                <div className='relative items-center h-[80vh] md:h-full md:w-full flex justify-center'>
                  <div className="relative md:max-h-[40rem] h-[70vh] w-[90vw] max-w-[400px] flex items-start">
                    {
                      updateMade()?.map((character, i) => {
                        return (
                          <React.Fragment key={i}>
                            <SwipeCard character={character} characters={updateMade()} i={i} onSwipe={handleSwipe} />
                          </React.Fragment>
                        )
                      })
                    }

                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      }
      {/* {
        !onlineUsers.length &&
        <Loader />
      } */}
    </>
  )
}

export default SearchPage
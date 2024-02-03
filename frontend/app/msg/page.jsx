"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

let socket;

const Home = () => {
    const { userInfo, to } = useSelector((state) => state.reciever)
    // console.log(userInfo)
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [allMessages, setAllMessages] = useState([]);


    useEffect(() => {
        socketInitializer();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    async function socketInitializer() {
        await fetch("/api/socket");

        socket = io();

        socket.on("receive-message", (data) => {

            if (data.to === to.email) {
                setAllMessages((pre) => [...pre, data]);
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log("emitted");

        socket.emit("send-message", {
            text: message,
            from: userInfo.email,
            to: to.email,
            time: new Date().getTime()
        });
        setMessage("");
    }

    return (
        <div>
            <h1>Chat app</h1>
            <h1>Enter a username</h1>

            <input value={username} onChange={(e) => setUsername(e.target.value)} />

            <br />
            <br />

            <div>
                {allMessages.map(({ username, message }, index) => (
                    <div key={index}>
                        {username}: {message}
                    </div>
                ))}

                <br />

                <form onSubmit={handleSubmit}>
                    <input
                        name="message"
                        placeholder="enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoComplete={"off"}
                    />
                </form>
            </div>
        </div>
    );
};

export default Home;
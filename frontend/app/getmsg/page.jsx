"use client"
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8080'; // Replace with your Vercel app URL

const socket = io.connect(SOCKET_SERVER_URL);
console.log(socket)

const Home = () => {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);

    useEffect(() => {
        // Listen for incoming messages from the server
        socket.on('message', (newMessage) => {
            setMessageHistory((prevMessages) => [...prevMessages, newMessage]);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = { text: message, timestamp: new Date().toLocaleTimeString() };

            // Emit the message to the server
            socket.emit('message', newMessage);

            setMessage('');
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <h2>Message History</h2>
                <ul>
                    {messageHistory.map((msg, index) => (
                        <li key={index}>
                            {msg.timestamp} - {msg.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;

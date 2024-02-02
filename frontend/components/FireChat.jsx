// components/Chat.js
"use client"// components/Chat.js
import React, { useState, useEffect } from 'react';
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);

    useEffect(() => {
        const handleMessage = (newMessage) => {
            setMessageHistory((prevMessages) => [...prevMessages, newMessage]);
        };

        emitter.on('message', handleMessage);

        return () => {
            emitter.off('message', handleMessage);
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = { text: message, timestamp: new Date().toLocaleTimeString() };
            setMessageHistory((prevMessages) => [...prevMessages, newMessage]);

            // Emit the message to all listeners
            emitter.emit('message', newMessage);

            // Send the message to the webhook
            sendToWebhook(newMessage);

            setMessage('');
        }
    };

    // Function to send the message to the webhook (replace this with your actual webhook endpoint)
    const sendToWebhook = async (newMessage) => {
        try {
            const webhookUrl = 'http://localhost:3000/api/route'; // Replace with your actual webhook URL
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });
        } catch (error) {
            console.error('Error sending message to webhook:', error);
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

export default Chat;

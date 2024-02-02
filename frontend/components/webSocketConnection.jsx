// components/WebSocketConnection.js
"use client"

import { useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketConnection = () => {
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:6001'); // Replace with your WebSocket server URL

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('WebSocket message received:', message);
            // Handle the incoming WebSocket message as needed
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close(); // Close WebSocket connection on component unmount
        };
    }, []);

    return null;
};

export default WebSocketConnection;

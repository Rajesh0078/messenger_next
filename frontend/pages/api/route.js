// api/socket.js
import { Server } from 'socket.io';

export default async function handler(req, res) {
    console.log("hiii")
    if (req.method === 'GET') {
        const io = new Server();
        io.on('connection', (socket) => {
            console.log('A user connected');

            // Handle incoming messages
            socket.on('message', (message) => {
                // Broadcast the message to all connected clients
                io.emit('message', message);
            });

            // Handle user disconnect
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });

        // Handle the WebSocket upgrade manually
        io.httpServer = {
            ...req.server,
            ...req.serverHttp,
        };

        io.attach(req.serverHttp);

        res.status(200).end();
    } else {
        res.status(405).end();
    }
}

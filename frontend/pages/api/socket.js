import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    global.onlineUsers = new Map();

    io.on("connection", (socket) => {

        console.log("connection found")
        global.chatBox = socket

        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id)
        })

        socket.on("send-message", (obj) => {
            const sendUserSocket = onlineUsers.get(obj.to)
            // if (sendUserSocket) {
            console.log("message-sended")
            io.emit("receive-message", obj);
            // } else {
            //     console.log("user not in online")
            // }

        });

        socket.on("disconnect", () => {
            for (const [key, value] of global.onlineUsers) {
                if (value === socket.id) {
                    global.onlineUsers.delete(key);
                    break;
                }
            }
            console.log("Connection disconnected");
        });
    });

    res.end();
}
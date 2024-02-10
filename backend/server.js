const express = require('express');
const app = express();
require("dotenv").config()
const cors = require("cors");
const bodyParser = require('body-parser');
const { Connection } = require('./config/db');
const router = require('./routes/userRoute');
const chatRouter = require('./routes/messageRouter');
const { Server } = require('socket.io');
const notifyRouter = require('./routes/notificationRouter');

Connection()

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello from backend!');
});


app.use('/auth', router)
app.use('/chat', chatRouter)
app.use('/notify', notifyRouter)

const PORT = process.env.PORT || 8888;

const server = app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3000/getmsg"]
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    // console.log("user connected")
    // global.chatSocket = socket
    socket.on("add-msg", (userId) => {
        // onlineUsers.set(userId, socket.id)
        io.emit("get-msg", userId)
    })

    // socket.on("user-created",()=>{
    //     io.emit("get-user")
    // })

    socket.on("disconnect", () => {
        // console.log("user disconnected")
    })
})

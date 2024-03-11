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
const https = require("https")

Connection()

app.use(cors())
app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }))


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

function recall(){
    https.get("https://messanger-j570.onrender.com/")
}

setInterval(recall, 60000)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3000/getmsg"]
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
        io.emit("receive-message", obj);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

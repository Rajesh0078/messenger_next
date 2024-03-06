const express = require('express');
const { Server } = require('socket.io');

const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3000/getmsg"]
    }
})

app.get('/', (req, res) => {
    res.send('Express server is running on port 4000');
});

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
        io.emit("receive-message", obj);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

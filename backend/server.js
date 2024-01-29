const express = require('express');
const app = express();
require("dotenv").config()
const cors = require("cors");
const bodyParser = require('body-parser');
const { Connection } = require('./config/db');
const router = require('./routes/userRoute');
const chatRouter = require('./routes/messageRouter');

Connection()

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello from backend!');
});


app.use('/auth', router)
app.use('/chat', chatRouter)

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

const mongoose = require('mongoose')

const MessagesModel = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: false,
        default: new Date().getTime()
    }
}, { versionKey: false })

module.exports = mongoose.model("Chats", MessagesModel, "messages")
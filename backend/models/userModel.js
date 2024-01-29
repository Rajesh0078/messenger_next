const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: {
        type: Array
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model("User", UserModel, "users")
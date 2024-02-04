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
    status: {
        type: String,
        default: "online"
    },
    friendsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    notifications: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: {
                type: String
            }
        }
    ]
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model("User", UserModel, "users")
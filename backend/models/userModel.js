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
    cpassword: {
        type: String,
        required: true
    },
    messeges: {
        type: Array,
        required: true
    },
    username: {
        type: String,
        required: true
    },


})

module.exports = mongoose.model("User", UserModel, "users")
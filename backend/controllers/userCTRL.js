const User = require('../models/userModel')
const jwt = require("jsonwebtoken")

const registerCtrl = async (req, res) => {
    try {
        const { email } = req.body
        const foundUser = await User.findOne({ email: email })

        if (foundUser) {
            res.json({ success: false, msg: "User already exists" })
        }
        else {
            const newUser = await User.create(req.body)
            res.status(200).json({ success: true, msg: "User created successfully", user: newUser })
        }

    } catch (error) {
        console.log("Error at Register", error)
    }
}

const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await User.findOne({ email: email })
        if (!findUser) {
            res.json({ message: 'User not found', success: false });
        }
        else if (password !== findUser.password) {
            res.json({ message: "Invalid Password", success: false })
        }
        else {
            let payload = {
                user: {
                    id: findUser._id
                }
            }
            jwt.sign(payload, "MyJwt", { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    console.error('Error signing token:', err);
                    res.status(500).json({ message: 'Internal Server Error', success: false });
                } else {
                    res.status(201).json({ token: token, success: true });
                }
            })
        }

    } catch (error) {
        console.log("Error at login ::", error)
    }
}

const getUserCtrl = async (req, res) => {
    try {
        const { id } = req.user
        const foundUser = await User.findById(id)
        if (!foundUser) {
            res.json({ success: false, msg: "User not found" })
        }
        else {
            res.json({ success: true, msg: "Successfully Logged in", user: foundUser })
        }
    } catch (error) {
        console.log("Error at Register", error)
    }
}

const allUsers = async (req, res) => {
    try {
        const foundUser = await User.find({})
        res.status(200).json({ success: true, users: foundUser })
    } catch (error) {
        console.log(error)
    }
}

const searchUser = async (req, res) => {
    try {
        const { id } = req.body
        const user = await User.findById(id)
        if (user) {
            res.status(200).json({ success: true, user: user })
        } else {
            res.json({ success: false, msg: "User not found" })
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerCtrl, loginCtrl, getUserCtrl, allUsers, searchUser }
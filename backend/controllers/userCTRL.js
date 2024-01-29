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
            res.status(200).json({ success: true, msg: "User already exists", user: newUser })
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
            res.json({ message: 'User not found' });
        }
        else if (password !== findUser.password) {
            res.json({ message: "Invalid Password" })
        }
        else {
            let payload = {
                user: {
                    id: findUser._id
                }
            }
            jwt.sign(payload, "MyJwt", { expiresIn: 600 }, (err, token) => {
                if (err) {
                    console.error('Error signing token:', err);
                    res.status(500).json({ message: 'Internal Server Error' });
                } else {
                    res.status(201).json({ token: token });
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

module.exports = { registerCtrl, loginCtrl, getUserCtrl }
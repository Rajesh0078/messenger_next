const express = require("express")
const { createMSG, getMSG } = require("../controllers/messageCTRL")

const chatRouter = express.Router()

chatRouter.post("/sendmsg", createMSG)
chatRouter.post("/getmsg", getMSG)


module.exports = chatRouter


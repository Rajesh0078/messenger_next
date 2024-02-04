const express = require("express")
const { setNotification, getNotifications } = require("../controllers/notificationCtrl")

const notifyRouter = express.Router()

notifyRouter.post("/setnotification", setNotification)
notifyRouter.post("/getnotification", getNotifications)


module.exports = notifyRouter


const User = require('../models/userModel')

const setNotification = async (req, res) => {
    try {
        const { senderId, senderName, recieverId } = req.body;
        const user = await User.findOne({ _id: recieverId, 'notifications.sender': senderId });

        if (user) {
            return res.status(200).json({ success: true, message: 'Request Already Sent' });
        } else {
            const update = await User.findByIdAndUpdate(
                recieverId,
                { $addToSet: { notifications: { sender: senderId, username: senderName } } },
                { new: true }
            )

            if (update) {
                return res.status(200).json({ success: true, update: update, message: "Request Sent" });
            } else {
                return res.status(400).json({ success: false, message: 'Failed to update user' });
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

const getNotifications = async (req, res) => {
    try {
        const { id } = req.body
        const update = await User.findById(id).select("notifications")
        if (update) {
            res.status(200).json({ success: true, notifications: update.notifications })
        }
        else res.status(400).json({ success: false })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { setNotification, getNotifications }
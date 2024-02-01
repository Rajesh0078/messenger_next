const Chats = require('../models/messagesModel')

const createMSG = async (req, res) => {
    try {
        const msg = await Chats.create(req.body)
        res.status(200).json({
            success: true,
            data: msg
        })
    } catch (error) {
        console.log("Error at creating msg", error)
    }
}

const getMSG = async (req, res) => {
    try {
        const { from, to } = req.body

        const data = await Chats.find({
            $or: [
                { $and: [{ from: from }, { to: to }] },
                { $and: [{ from: to }, { to: from }] }
            ]
        })
        res.status(200).json({
            success: true,
            data: data
        })

    } catch (error) {
        console.log("Error at getting msg", error)
    }
}

module.exports = { createMSG, getMSG }
const mongoose = require("mongoose")

const Connection = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("Db Connected successfully")
    } catch (error) {
        console.log("Error at db connection", error)
    }
}

module.exports = { Connection }
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("x-token")
        if (!token) {
            res.status(500).send("Token Not Found")
        }
        const decode = jwt.verify(token, "MyJwt")
        req.user = decode.user
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error at middleware', error: error });
    }
}


module.exports = authMiddleware
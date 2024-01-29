const express = require("express")
const { loginCtrl, registerCtrl, getUserCtrl } = require("../controllers/userCTRL")
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/login', loginCtrl)
router.post('/register', registerCtrl)
router.get('/getuser', authMiddleware, getUserCtrl)

module.exports = router


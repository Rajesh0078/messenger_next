const express = require("express")
const { loginCtrl, registerCtrl, getUserCtrl, allUsers } = require("../controllers/userCTRL")
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/login', loginCtrl)
router.post('/register', registerCtrl)
router.get('/getuser', authMiddleware, getUserCtrl)
router.get('/users', allUsers)

module.exports = router


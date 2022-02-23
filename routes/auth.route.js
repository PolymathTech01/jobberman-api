const express = require("express")
const router = express.Router()
const authController = require('../controllers/auth.controller')


router.post('/User/login', authController.Login)


module.exports = router
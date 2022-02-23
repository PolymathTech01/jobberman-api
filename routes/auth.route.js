const express = require("express")
const router = express.Router()
const authController = require('../controllers/auth.controller')


router.post('/user/login', authController.Login_JobSeeker)

router.post('/user/employer/login', authController.Login_Employer)

router.post('/user/admin/login', authController.Login_Admin)



module.exports = router
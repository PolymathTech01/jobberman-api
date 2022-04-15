const express = require("express")
const router = express.Router()
const employerControllers = require("../controllers/employer.controller")

router.post("/employer/signup", employerControllers.createEmployer)
router.get("/employer/verify-otp/:employeer_id/:otp", employerControllers.verifyOtp)
router.get("/employer/resend-otp/:work_email", employerControllers.resendOtp)

module.exports = router
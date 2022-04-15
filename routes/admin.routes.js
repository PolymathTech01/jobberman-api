const express = require("express")
const router = express.Router()
const adminControllers = require("../controllers/admin.controller")

router.post("/admin/signup", adminControllers.createAdmin)
router.get("/admin/verify-otp/:admin_id/:otp", adminControllers.verifyOtp)
router.get("/admin/resend-otp/:email", adminControllers.resendOtp)

module.exports = router
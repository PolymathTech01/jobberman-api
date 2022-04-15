const express = require("express")
const router = express.Router()
const jobSeekerControllers = require("../controllers/jobSeeker.controllers")

router.post("/job-seeker/signup", jobSeekerControllers.createJobSeeker)
// router.post("/employer-signin", userControllers.createEmployer)
// router.post("/admin-signin", userControllers.createAdmin)
router.get("/job-seeker/verify-otp/:job_seeker_id/:otp", jobSeekerControllers.verifyOtp)
router.get("/job-seeker/resend-otp/:email", jobSeekerControllers.resendOtp)

module.exports = router

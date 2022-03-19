const express = require("express")
const router = express.Router()
const jobSeekerControllers = require("../controllers/jobSeeker.controllers")

router.post("/signin", jobSeekerControllers.createJobSeeker)
// router.post("/employer-signin", userControllers.createEmployer)
// router.post("/admin-signin", userControllers.createAdmin)
router.get("/job-seeker/verify-otp/:job_seeker_id/:otp", jobSeekerControllers.verifyOtp)

module.exports = router

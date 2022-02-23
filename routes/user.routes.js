const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/user.controllers")

router.post("/signin", userControllers.createJobSeeker)

module.exports = router

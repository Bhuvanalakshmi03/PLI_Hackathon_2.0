const express = require("express")
const router = express.Router()

// route controller
const authController = require("../controller/auth")

router.get("/",authController.loginPage)
router.get("/register",authController.registerPage)
router.post("/register",authController.PostRegister)
router.post("/",authController.PostLogin)
router.get('/logout',authController.logout)

module.exports = router
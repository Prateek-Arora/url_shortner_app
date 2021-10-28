const express = require("express");
const router = express.Router();

module.exports = router


const {registerUser, loginUser} = require('../../controllers/user.controller')

router.post("/register", registerUser)
router.post("/login", loginUser)
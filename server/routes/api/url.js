const express = require("express");
const router = express.Router();

const { shortenUrl } = require('../../controllers/url.controller')

module.exports = router

router.post('/shorten', shortenUrl)


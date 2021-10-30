const express = require("express");
const router = express.Router();
const {redirectUrl} = require('../../controllers/url.controller')

module.exports = router;

router.get('/:code', redirectUrl)
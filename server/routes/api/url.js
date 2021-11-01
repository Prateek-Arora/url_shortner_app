const express = require("express");
const router = express.Router();

const { shortenUrl, getHistoricUrls, getUrlData, deleteUrl, updateUrl } = require('../../controllers/url.controller')

module.exports = router

router.post('/shorten', shortenUrl)
router.delete('/delete/:urlCode', deleteUrl)
router.put('/update/:urlCode', updateUrl)
router.post('/update')
router.get('/data/:urlCode', getUrlData)
router.get('/', getHistoricUrls)


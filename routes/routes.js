const express = require("express");
const router = express.Router();
const { handleGenerateShortUrl,handleGetAnalytics } = require("../controller/handle")
router.route("/")
.post(handleGenerateShortUrl)

router.get("/analytics/:shortId" ,handleGetAnalytics)
module.exports = router;
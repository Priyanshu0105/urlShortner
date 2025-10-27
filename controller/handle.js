const {nanoid} = require("nanoid");
const URL = require("../model/model")
async function handleGenerateShortUrl(req ,res) {
    const allUrls = await URL.find({})
    const shortID = nanoid(8);
    const body = req.body;
    if(!body.url){
        return res.status(400).json({msg: "url is required"})
    }
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home" ,{
        id : shortID,
        urls: allUrls,
    })
}
async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}
module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
}
const express = require("express")
const app = express();
const {connectMongoDb} = require("./connection")
const urlRouter = require("./routes/routes")
const URL = require("./model/model")
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/urlShortner")
.then(()=> console.log("server started"))



app.use(express.json());

app.use("/url" , urlRouter)
app.get("/:shortId" , async (req , res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push : {
        visitHistory: {
            timestamp:Date.now()
        }
    }, 
  }
);
res.redirect(entry.redirectUrl)
});
app.listen(PORT, () => console.log("server started"))
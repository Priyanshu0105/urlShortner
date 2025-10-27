const express = require("express")
const path = require("path")
const app = express();
const {connectMongoDb} = require("./connection")
const staticRoute = require("./routes/staticRouter")
const urlRouter = require("./routes/routes")
const URL = require("./model/model")
const PORT = 8001;
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly ,checkAuth} = require("./middlewares/auth");
connectMongoDb("mongodb://127.0.0.1:27017/urlShortner")
.then(()=> console.log("server started"))

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use("/" ,checkAuth, staticRoute)
app.use("/user" , userRoute)
app.get("/test" , async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home" ,{
        urls:allUrls,
    });
})
app.use("/url" ,restrictToLoggedinUserOnly, urlRouter)
app.get("/url/:shortId" , async (req , res) =>{
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
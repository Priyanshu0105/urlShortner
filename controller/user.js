const User = require("../model/user");
const URL = require("../model/model")
const {v4:uuidv4} = require("uuid")
const {setUser} = require("../service/auth")
async function handleUserSignup(req, res) {
    const {name , email , password} = req.body;
    const allUrls = await URL.find({ createdBy:req.user._id})
    await User.create({
        name,
        email,
        password,
    });
        return res.redirect("/", { urls: allUrls });
}
async function handleUserLogin(req,res) {
    const{email , password} = req.body;
    const user = await User.findOne({email, password})
    if(!user) return res.render("login" ,{
        error:"invalid username or pass"
    })

        const token = setUser(user);
        res.cookie("uid" , token);
        return res.redirect("/");
}

module.exports ={
    handleUserSignup,
    handleUserLogin,
}
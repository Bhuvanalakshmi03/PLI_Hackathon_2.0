const loginPage = async(req,res)=>{
    res.render('login')
}

const registerPage = async(req,res)=>{
    res.render('register')
}

const PostRegister = async (req, res) => {
    Object.keys(req.cookies).forEach(cookieName => {
        res.clearCookie(cookieName);
      });
    
    res.cookie("walletID", req.body.wallet_id);
    res.cookie("location", req.body.location);
    res.cookie("name", req.body.name);
    res.json("OK")
}

const PostLogin = async (req, res) => {
    Object.keys(req.cookies).forEach(cookieName => {
        res.clearCookie(cookieName);
      });
    
    res.cookie("walletID", req.body.wallet_id);
    res.cookie("location", req.body.location);
    res.cookie("name", req.body.name);
    res.json("OK")
}

const logout = async(req,res)=>{
    res.clearCookie("name");
    res.clearCookie("location");
    res.clearCookie("walletID");
    res.redirect('/')
}

module.exports = {loginPage,registerPage,PostRegister,PostLogin,logout}
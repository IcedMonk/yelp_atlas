var express = require('express');
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");




/* GET home page. */
router.get("/logout", function(req, res){
    req.logout();
    req.flash('success', 'Logged out Successfully!');
    res.redirect("/");
  });

router.get("/register", (req,res) => {
    res.render("register");
});


router.get("/login", (req, res) => {
    res.render("signin");
});


router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req,res) {
});


router.post("/register", (req, res) => {
    user.register(new user({username: req.body.username}), req.body.password, function(err, data){
        if(err) {
            req.flash('error', err.message)
            return res.redirect("register")
        }
        passport.authenticate("local")(req,res, function(){
            req.flash('success', 'Welcome '+ data.username);
            res.redirect("/");
        });
    });
});


module.exports = router;

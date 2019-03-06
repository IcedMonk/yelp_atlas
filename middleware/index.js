var campground = require("../models/blog");
var comment = require("../models/comment");
var flash = require("connect-flash");
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please Login!!');
    res.redirect("/login");
};

middlewareObj.checkOwnerShipCamp = function (req, res, next){
    if(req.isAuthenticated()) {
        campground.findById(req.params.id, function(err, bata) {
            if(err){
                res.redirect("back");
            } else {
                if(bata.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};



middlewareObj.checkOwnerShipCom = function (req, res, next){
    if(req.isAuthenticated()) {
        comment.findById(req.params.comment_id, function(err, bata) {
            if(err){
                res.redirect("back");
            } else {
                if(bata.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("/");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}



module.exports = middlewareObj;
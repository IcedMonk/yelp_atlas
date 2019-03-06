var express = require("express");
var campground = require("../models/blog");
var comment = require("../models/comment");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");







router.get('/new', middleware.isLoggedIn, function(req,res){
    campground.findById(req.params.id, function(err, data){
        if(err) {
            console.log("Error at /id/comments/new");
        } else {
            res.render("newcomment", {data: data});
        }
    });
});


router.post("/",middleware.isLoggedIn, function(req,res){
    campground.findById(req.params.id, function(err, data){
        if(err){
            console.log("Error at /id/comments in post router");
        } else {
            comment.create(req.body.cum, function(err, deta){
                if(err){
                    req.flash('error', 'Something went wrong!');
                } else {
                    deta.author.id = req.user._id;
                    deta.author.username = req.user.username;
                    deta.save();
                    data.comments.push(deta);
                    data.save();
                    req.flash('success', 'Created a Comment!')
                    res.redirect("/"+req.params.id);
                }
            });
        }
    });
});

//Edit route for comment v10
router.get("/:comment_id/edit",middleware.checkOwnerShipCom, function(req, res){
   comment.findById(req.params.comment_id, function(err, comment) {
       if(err) {
           console.log(err);
       } else {
           res.render("editcomment", {comment: comment, campground_id: req.params.id });
       }
   }); 
});


router.put("/:comment_id",middleware.checkOwnerShipCom, function (req, res) {
    comment.findByIdAndUpdate(req.params.comment_id, req.body.cum, function (err, comment) {
        if(err) {
            console.log(err);
        } else {
            req.flash('success', 'Successfully Edited the Comment!')
            res.redirect("/" + req.params.id);
        }
    });
});


router.delete("/:comment_id",middleware.checkOwnerShipCom, function(req, res){
    comment.findByIdAndRemove(req.params.comment_id, function(err, data){
        if(err) {
            req.flash('error', 'Something went wrong!')
            console.log(err);
        } else {
            req.flash('success', 'Successfully Deleted Comment')
            res.redirect("/" + req.params.id);
        }
    });
});




module.exports = router;


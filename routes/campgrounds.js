var express = require('express');
var router = express.Router();
var campground = require("../models/blog");
var middleware = require("../middleware");




/* GET users listing. */
router.get('/', function(req, res, next) {
  campground.find({},function(err, data) {
   if(err) {
       console.log(err);
   } else {
       res.render("index", {data: data});
   }
  });
});


router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("new");
});



router.get("/:id", function(req, res, next) {
    campground.findById(req.params.id).populate("comments").exec(function (err, found) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {data: found});
        }
    });
});

//Adding Edit router in v10
router.get("/:id/edit",middleware.checkOwnerShipCamp, function(req, res) {
    campground.findById(req.params.id, function(err, data){
       if(err) {
           console.log("Error at edit route");
       } else {
           res.render("editcampground", {data: data});
       }
    });
});


router.put("/:id",middleware.checkOwnerShipCamp, function(req, res){
   campground.findByIdAndUpdate(req.params.id, req.body.edit, function(err, data){
       if (err) {
            req.flash('error', 'Something went wrong!');
            res.redirect("/")
       } else {
            req.flash('success', 'Successfully Edited Post')
            res.redirect("/" + req.params.id);     
       }
   }); 
});

//edit router from v10
router.delete("/:id",middleware.checkOwnerShipCamp, function(req, res){
   campground.findByIdAndRemove(req.params.id, function(err, data){
      if(err){
            req.flash('error', 'Something went wrong!');
            res.redirect("/")
      } else {
        req.flash('success', 'Successfully Deleted post!')
          res.redirect("/");
      }
   }); 
});



router.post("/",middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var text = req.body.text;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var full = {title: title, image: image, text: text, author: author, price: price};
    campground.create(full, function(err, data){
        if(err) {
            req.flash('error', 'Something went wrong!');
            res.redirect("/");
        } else {
            req.flash('success', 'Successfully created Post');
            res.redirect("/");
        }
    });
});


module.exports = router;

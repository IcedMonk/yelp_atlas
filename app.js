var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStartegy = require("passport-local");
var user = require("./models/user");
var methodOverride = require("method-override");


mongoose.connect("mongodb://localhost/two");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
// seedDB();

//Router
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//passport Configs
app.use(require("express-session")({
    secret: "A@a#B$b%C^c&D*d(E)e_E+f=1,2<9>/}?\|",
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



app.use(indexRoutes);
app.use(campgroundRoutes);
app.use("/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Is listening at:" + process.env.PORT);
});
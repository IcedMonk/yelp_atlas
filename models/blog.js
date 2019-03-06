var mongoose  = require("mongoose");
//schema
var campSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "user"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = mongoose.model("campground", campSchema);
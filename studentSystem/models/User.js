var mongoose = require("mongoose");

module.exports = mongoose.model("User", {
    "id" : Number,
    "username" : String,
    "sex" : String,
    "password" : String,
    "url" : String
})


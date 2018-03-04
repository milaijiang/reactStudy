var mongoose = require("mongoose");

module.exports = mongoose.model("Messages_2014", {
    "id" : Number,
    "name" : String,
    "sex" : String,
    "class" :String,
    "math" : Number,
    "chinese" : Number,
    "english" : Number,
    "sport" : Number,
    "art" : Number
})
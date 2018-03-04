var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
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
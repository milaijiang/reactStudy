var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    "monday" : Object,
    "morning" : Object,
    "curriculum" : Object,
    "course" :String,
    "afternoon" : Object,
    "tuesday" : Object,
    "wednesday" : Object,
    "thursday" : Object,
    "friday" : Object,
    "saturday" : Object,
    "sunday" : Object,
    "mission" : Object,
    "name" : String,
    "adress" : String
})
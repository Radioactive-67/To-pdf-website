const mongoose = require('mongoose');

const conversionSchema = mongoose.Schema({
    timeOfConversion:{
        type:Date,
        default:Date.now
    },
    fileName:String
});

const userSchema = mongoose.Schema({
    userName:String,
    pwd:String,
    pastConversion:[conversionSchema]
});

module.exports = mongoose.model('user',userSchema);
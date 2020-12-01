const mongoose = require('mongoose');

const workCategory = mongoose.Schema({
    workId : String,
    WorkTypes : {type : String,required : 'Please enter WorkType'}
});

module.exports = mongoose.model('WorkCategory',workCategory);
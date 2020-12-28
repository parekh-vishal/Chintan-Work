const mongoose = require('mongoose');

const workCategory = mongoose.Schema({
    workId : String,
    WorkTypes : {type : String,required : 'Please enter WorkType'},
    organization : {
        orgId : String,
        orgName : String
    }
});

module.exports = mongoose.model('WorkCategory',workCategory);
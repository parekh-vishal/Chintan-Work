const mongoose = require('mongoose');

const workCategory = mongoose.Schema({
    WorkId : {String},
    WorkTypes : {String,required : 'Please enter WorkType'}
});

module.exports = mongoose.model('WorkCategory',workCategory);
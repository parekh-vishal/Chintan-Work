const mongoose = require('mongoose');

const workCategory = mongoose.Schema({
    WorkTypes : {String,required : 'Please enter WorkType'}
});

module.exports = mongoose.model('WorkCategory',workCategory);
const { raw } = require("body-parser");

const mongoose = require('mongoose');

const workCategory = mongoose.Schema({
    
});

module.exports = mongoose.model('WorkCategory',workCategory);
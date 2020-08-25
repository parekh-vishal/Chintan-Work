const mongoose = require('mongoose');

const suppier = mongoose.Schema({
        supervisorNo : String,
        suppierName :  String,
        suppierContactNo : Number,
        consitementDetails : String
});
const mongoose = require('mongoose');
const workDesSchema = mongoose.Schema({
    supervisorId : String,
    supervisorContactNo : Number,
    workName : {type : String},
    totalworker : {
        mason : Number,
        labour : Number,
        male : Number,
        female : Number
    },
    workDescription : String,
    cementAmount : String,
    date : Date
});
module.exports = mongoose.model('Work',workDesSchema);
                                                        
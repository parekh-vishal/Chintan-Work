const mongoose = require('mongoose');
const workDesSchema = mongoose.Schema({
    siteId : String,
    supervisorId : String,
    workName : {type : String},
    totalworker : {
        mason : Number,
        labour : Number,
    },
    workDescription : String,
    cementAmount : String,
    date : Date
});
module.exports = mongoose.model('Work',workDesSchema);
                                                        
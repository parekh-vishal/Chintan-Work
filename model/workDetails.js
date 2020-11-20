const mongoose = require('mongoose');
let workDetail = {
    workType : String,
    totalworker : {
        mason : Number,
        labour : Number,
    },
    workDescription : String
}
const workDesSchema = mongoose.Schema({
    siteId : String,
    siteName : String,
    supervisorId : String,
    supervisorName : String,
    Works : [workDetail],
    cementAmount : Number,
    date : Date
});
module.exports = mongoose.model('Work',workDesSchema);
                                                        
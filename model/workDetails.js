const mongoose = require('mongoose');
let workDetail = {
    workCategoryId : String,
    workType : String,
    totalworker : {
        mason : Number,
        labour : Number,
    },
    workDescription : String
}
const workDesSchema = mongoose.Schema({
    workId : String,
    orgId : String,
    siteId : String,
    siteName : {type : String, required : 'Please enter your Site Name'},
    supervisorId : String,
    supervisorName : String,
    Works : [workDetail],
    cementAmount : {type : Number, required : 'Please enter Cement Amout'},
    date : String
});
module.exports = mongoose.model('Work',workDesSchema);
                                                        
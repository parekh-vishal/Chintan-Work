const mongoose = require('mongoose');

const constructionSite = mongoose.Schema({
    siteId : String,
    siteName : {type : String,required :'Please enter your Site Name'},
    ownerName : { type :String, required : 'Please enter your Owner name'},
    ownerContactNo : {type :Number, required : 'Please enter your Owner\'s ContactNo'},
    siteAddress : {AddressLine1 : {type :String, required : 'Please enter Address'},
                   City : {type :String, required : 'Please enter City'},
                   State : {type :String,required : 'Please enter State'},
                   pincode : {type :Number, required : 'Please enter Pincode'}},
    siteInaugurationDate : {type :Date, required : 'Please enter InaugurationDate'},
    siteEstimate : {type :String, required : 'Please enter Estimate of Site'},
    tentativeDeadline : {type :Date, required : 'Please enter Deadline Date'}
});

module.exports = mongoose.model('Construction_Site' , constructionSite);
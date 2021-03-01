const mongoose = require('mongoose');

const orgSchema = mongoose.Schema({
    orgId : String,
    orgName : String,
    orgOwnerName : String,
    orgAddress : {
                   AddressLine1 : {type :String, required : 'Please enter Address'},
                   City : {type :String, required : 'Please enter City'},
                   State : {type :String,required : 'Please enter State'},
                   pincode : {type :Number, required : 'Please enter Pincode'}
    },
    orgStatus : {type : String,default : 'Active'},
    subscription : {type : Number,default:1}
});

module.exports = mongoose.model('Organization',orgSchema);
const mongoose = require('mongoose');
let siteSupervisor = {
    siteSupervisorId : String,
    siteSupervisorName : String,
    siteSupervisorNo : Number
}
const constructionSite = mongoose.Schema({
    siteId : String,
    siteName : String,
    ownerName : String,
    ownerContactNo : Number,
    siteAddress : {AddressLine1 : String,
                   City : String,
                   State : String,
                   pincode : Number},
    siteInaugurationDate : Date,
    siteEstimate : String,
    tentativeDeadline : Date,
    supervisors : [siteSupervisor]
});

module.exports = mongoose.model('Construction_Site' , constructionSite);
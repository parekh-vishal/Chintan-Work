const mongoose = require('mongoose');

const constructionSite = new mongoose({
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
    siteSupervisor : String,
    siteSupervisorNo : Number,
    siteSupervisorId : String,
});
const mongoose = require('mongoose');

const siteInventory = mongoose.Schema({
    regdId : String,
    siteId : String,
    supervisorName : {type : String,required: "Enter Supervisor Name"},
    materialType : {type : String,required: "Enter Mater Type"},
    pricePerUnit : {type : Number},
    invoicePrice : {type : Number, required: "Enter Invoice Price"},
    invoiceNo : String,
    date : {type:Date, default: Date.now()}
});

module.exports = mongoose.model("SiteInventory",siteInventory);
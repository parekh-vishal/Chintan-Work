const mongoose = require('mongoose');

const siteInventory = mongoose.Schema({
    metId : String,
    siteId : String,
    supervisorName : {type : String,required: "Enter Supervisor Name"},
    supervisorId : String,
    materialType : {type : String,required: "Enter Mater Type"},
    materialUnit : {type : String, required: "Enter material Unit"},
    materialTotalQuantity : {type : String, required: "Enter Material Total Quantity"},
    pricePerUnit : {type : Number},
    invoicePrice : {type : Number, required: "Enter Invoice Price"},
    invoiceNo : String,
    date : {type:Date, default: Date.now()}
});

module.exports = mongoose.model("SiteInventory",siteInventory);
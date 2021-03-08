const mongoose = require('mongoose');
//const workCategory = require('./workCategory');
let siteSupervisor = {
    supervisorId : String,
    supervisorName : String
}
let userExpense = {
    expenseUserId : String,
    expenseUserName : String,
}
let adminUser = {
    adminUserId : String,
    adminUserName : String
} 
let workCategory = {
    workCategoryId : String,
    workType : String
}
let siteSettings = mongoose.Schema({
    siteId : String,
    orgId : String,
    supervisors : [siteSupervisor],
    userExpense : [userExpense],
    adminUsers : [adminUser],
    workCategories : [workCategory]
});
module.exports = mongoose.model('Rules' ,siteSettings);
const mongoose = require('mongoose');
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
let siteSettings = mongoose.Schema({
    siteId : String,
    supervisors : [siteSupervisor],
    userExpense : [userExpense],
    adminUsers : [adminUser]
});
module.exports = mongoose.model('Rules' ,siteSettings);
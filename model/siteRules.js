const mongoose = require('mongoose');
let siteSupervisor = {
    siteSupervisorId : String,
    siteSupervisorName : String,
    siteSupervisorNo : Number
}
let supervisor = {
    supervisorId : String,
    SupervisorName : String,
}
let adminUser = {
    adminUserId : String,
    adminUserName : String
} 
const workCategory = {
}
let siteSettings = mongoose.Schema({
    siteId : String,
    supervisors : [siteSupervisor],
    userExpense : [supervisor],
    adminUsers : [adminUser],
    workCategory : []
});
module.exports = mongoose.model('Rules' ,siteSettings);
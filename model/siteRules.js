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
let siteSettings = mongoose.Schema({
    siteId : String,
    supervisors : [siteSupervisor],
    userExpense : [supervisor]
});
module.exports = mongoose.model('Rules' ,siteSettings);
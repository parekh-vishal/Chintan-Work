const SiteRule = require('../model/siteRules');
exports.checkUserPermission = (filter) => {
    let adminUser = [];
    let supervisor = [];
    let expneseUser = [];
    return SiteRule.find(filter).exec()
    .then(doc=>{
        for (let i = 0; i < doc[0].adminUsers.length; i++) {
            adminUser.push(doc[0].adminUsers[i].adminUserId);
        }
        for (let i = 0; i < doc[0].supervisors.length; i++) {
            supervisor.push(doc[0].supervisors[i].supervisorId);
        }
        for (let i = 0; i < doc[0].userExpense.length; i++) {
            expneseUser.push(doc[0].supervisors[i].expenseUserId);
        }
        return {adminUser:adminUser,supervisor:supervisor,expneseUser:expneseUser};
    })
    .catch(err => {
        console.log(err);
        return err;
    });
};
const SiteRule = require('../model/siteRules');

const Organization = require('../model/organization');

//Create Custom Ids 
exports.createIDs = (lId,idString)=>{
    let id = lId;
    if (id == null) {
        id = idString+'0';
    }
    else {
        let dum = parseInt(id.replace(idString, ''));
        dum += 1;
        id = idString + dum;

    }
    return id;
}
//Check User Permission
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

//Return OrgName Provided OrgID
exports.getOrgName = (orgId)=>{
    return Organization.findOne({orgId : orgId}).select('orgName').exec()
                        .then(doc=>{
                            if(!doc){
                                throw "Organization Not Found"
                            }
                            const orgName = doc.orgName;
                            return orgName;
                        })
                        .catch(err => {
                            console.log(err);
                            return err;
                        });
}

//Count Total Documents or records in Database.
// exports.getDocCount = (filter,collection)=>{
//     return collection.countDocuments(filter).exec()
//     .then(docCount=>{
//         return docCount;
//     })
//     .catch(err => {
//         console.log(err);
//         return err;
//     });
// };
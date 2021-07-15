const SiteRule = require('../model/siteRules');

const Organization = require('../model/organization');
const date = require('date-and-time');
const moment = require('moment');

//Create Custom Ids 
exports.createIDs = (lId, idString) => {
    let id = lId;
    if (id == null) {
        id = idString + '0';
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
        .then(doc => {
            for (let i = 0; i < doc[0].adminUsers.length; i++) {
                adminUser.push(doc[0].adminUsers[i].adminUserId);
            }
            for (let i = 0; i < doc[0].supervisors.length; i++) {
                supervisor.push(doc[0].supervisors[i].supervisorId);
            }
            for (let i = 0; i < doc[0].userExpense.length; i++) {
                expneseUser.push(doc[0].supervisors[i].expenseUserId);
            }
            return { adminUser: adminUser, supervisor: supervisor, expneseUser: expneseUser };
        })
        .catch(err => {
            console.log(err);
            return err;
        });
};

//Return OrgName Provided OrgID
exports.getOrgName = (orgId) => {
    return Organization.findOne({ orgId: orgId }).select('orgName').exec()
        .then(doc => {
            if (!doc) {
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

//Return Current Date and Next Day Date in ISO format

exports.returnQueryDates = (dateFrom, dateTo) => {
    dateTo = dateTo.split('-').reverse().join('-');
    dateFrom = dateFrom.split('-').reverse().join('-');
    let nxQdate = new Date(dateTo);
    let qDate = new Date(dateFrom);
    const momentDate = new Date(moment(nxQdate).add(1,'days'));
    //let nDate = new Date(moment(nxQdate).add(1,'days'));
    // if (nDate.length == 1) {
    //     nDate = '0' + nDate;
    // }
    let nxtQdate = new Date(moment(nxQdate).add(1,'days'));;

    // nxtQdate[2] = nDate;
    // nxtQdate = nxtQdate.join('-');
    // nxtQdate = new Date(nxtQdate);
    return { qDate, nxtQdate };
};







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
// Convert User date into DB format i.e convert DD-MM-YYYY into ISO YYYY-MM-DD format
exports.isoDateToString = (userDate) => {
    let temp = new Date(userDate);
    temp = temp.getDate() + '-' + parseInt(temp.getMonth() + 1) + '-' + temp.getFullYear();
    //let temp = (userDate[2]=='-')?userDate.split('-'):userDate.split('/');
    //temp = temp.reverse();
    //temp = temp.toLocaleDateString();
    // temp = temp.split('/');
    // temp = temp.reverse();
    // temp = temp.join('-');
    // temp = `${temp}`;
    // console.log('t1',temp);
    //let servDate = new Date();
    // servDate = date.format(servDate, temp.join('-'));
    //servDate = new Date(servDate.toString());
    //console.log("serv",servDate.toLocaleDateString());
    return temp;
};

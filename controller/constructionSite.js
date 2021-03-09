const Constructsite = require('../model/constructionSite');
const SiteRules = require('../model/siteRules');
const User = require('../model/user');
const Authusr = require('../Authentication/tokenToUsr');
const PDF = require('html-pdf');
const pdfTemplate = require('../Documents');
const path = require('path');
const fs = require('fs');
const Util = require('../Utils/util');
const { throws } = require('assert');
//This Function Used for Add New Site
exports.addSite = (req, res, next) => {
    const userInfo = Authusr(req);
    const userId = userInfo.id;
    const orgId = userInfo.orgId;
    Constructsite.find({ siteName: req.body.siteName, "organization.orgId" : orgId }).exec()
        .then(async (doc) => { 
            let orgName = await Util.getOrgName(orgId);
            if (doc.length >= 1) {
                return res.status(409).json({
                    message: "Site already exist"
                });
            }
            else {
                Constructsite.find({'organization.orgId': orgId}).select('siteId').exec()
                    .then(doc => {
                        const siteId = Util.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].siteId : null, "SITE");
                        const site = new Constructsite({
                            siteId: siteId,
                            siteName: req.body.siteName,
                            ownerName: req.body.ownerName,
                            ownerContactNo: req.body.ownerContactNo,
                            createdBy: userId,
                            siteAddress: {
                                AddressLine1: req.body.siteAddress.AddressLine1,
                                City: req.body.siteAddress.City,
                                State: req.body.siteAddress.State,
                                pincode: req.body.siteAddress.pincode
                            },
                            siteInaugurationDate: req.body.siteInaugurationDate,
                            siteEstimate: req.body.siteEstimate,
                            tentativeDeadline: req.body.tentativeDeadline,
                            organization: {
                                orgId: orgId,
                                orgName: orgName
                            }
                        });
                        let userInfo = Authusr(req);
                        //console.log("userInfo",userInfo);
                        let adminUsrArr = [{
                            "adminUserId": userInfo.id,
                            "adminUserName": userInfo.name
                        }];
                        //  console.log(adminUsrArr);
                        let siteRule = new SiteRules({
                            siteId: siteId,
                            orgId : orgId,
                            adminUsers: adminUsrArr
                        });
                        siteRule.save()
                            .then(() => {
                                site.save()
                                    .then(() => {
                                        res.status(200).json({
                                            message: "Site Added"
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(502).json({
                                            error: err
                                        });
                                    });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(502).json({
                                    error: err
                                });
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({
                            error: err
                        });
                    });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        })
};
//Change Site Status 
exports.chngSiteStatus = (req, res) => {
    const filter = req.query;
    Constructsite.findOne(filter).select('siteStatus').exec()
        .then(doc => {
            const status = 'Deactivated';
            doc.siteStatus = status;
            doc.save()
                .then(() => {
                    res.status(200).json({
                        message: 'Site Status Updated'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        })
};
//Edit Site Settings
exports.editSiteSettings = (req, res) => {
    const filter = req.query;
    console.log(filter);
    const reqBody = req.body;
    const userInfo = Authusr(req);
    const userId = userInfo.id;
    const qFilter = JSON.parse(`{"$and":[{"siteId" : "${filter.siteId}"},{"adminUsers.adminUserId" : "${userId}"}]}`);
    SiteRules.findOne(qFilter).exec()
        .then(doc => {
            if (!doc) {
                console.log("You Does not have access to edit Site Settings");
                res.status(200).json({
                    error_message: "You Does not have access to edit Site Settings"
                });
            }
            const qrykeys = Object.keys(reqBody);
            //  console.log(reqBody);
            for (let i = 0; i < qrykeys.length; i++) {
                let innerLoop = reqBody[qrykeys[i]];
                let docArr = doc[qrykeys[i]];
                for (var j = 0; j < innerLoop.length; j++) {
                    docArr[j] = innerLoop[j];
                }
                if (docArr.length > j) {
                    for (let i = docArr.length; i > j; i--) {
                        docArr.pop();
                    }
                }
            }
            doc.save()
                .then(() => {
                    res.status(200).json({
                        message: "Site Settings Updated"
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({
                        error: err
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({
                        error: err
                    });
                });
        })
};

//Get Site by SiteID
exports.getSite = (req, res) => {
    const siteId = req.params.siteId;
    Constructsite.findOne({ siteId: siteId }).exec()
        .then(doc => {
            if (!doc) {
                throw err;
            }
            else {
                res.status(200).json(doc);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: "Site Not Found",
                error: err
            });
        })
}
//Get All Site Function
exports.getAllSite = (req, res) => {
    const {page =1 , limit =10} = req.query;
    const userInfo = Authusr(req);
    const uid = userInfo.id;
    const orgId = userInfo.orgId;
    const queryfilterJson = `{"$or" : [{"adminUsers.adminUserId":"${uid}"},{"supervisors.supervisorId" : "${uid}"},{"userExpense.expenseUserId":"${uid}"}]}`;
    const queryfilterObj = JSON.parse(queryfilterJson);
    SiteRules.find(queryfilterObj).limit(limit*1).skip((page-1)*limit).select('siteId').exec()
        .then(doc => {
            let siteIds = [];
            for (let i = 0; i < doc.length; i++) {
                siteIds.push(doc[i].siteId);
            }
            Constructsite.find({ siteId: siteIds, siteStatus: 'Active', 'organization.orgId': orgId }).exec() //{ siteId: siteIds,siteStatus : 'Active'}
                .then(doc => {
                    if(!doc){
                        throw "Sites Not Found"
                    }
                    res.status(200).json(doc);
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({
                        error: "Bad Gateway"
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: "Bad Gateway"
            });
        });
};
//Get Site Settings 
exports.getSiteSetting = (req, res) => {
    const filter = req.query; //Query Format ?siteId=site0&amp;adminUsers.adminUserId=usr0; 
    // console.log(filter);
    const userInfo = Authusr(req);
    const orgId = userInfo.orgId;
    filter.orgId = orgId;
    SiteRules.findOne(filter).exec()
        .then(doc => {
            if (doc != null) {
                res.status(200).json(doc);
            }
            else {
                res.status(200).json({
                    error: "Permission Denied"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: "Bad Gateway"
            });
        });
};
//Edit Site Info Funcion
exports.editSiteInfo = (req, res) => {
    const filter = req.body.siteId;
    Constructsite.findOneAndUpdate({ siteId: filter }, req.body).exec()
        .then(doc => {
            //   console.log(doc)
            res.status(200).json({
                message: "Site Info Updated"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
};

//Create PDF file for Construction Site.
exports.generatePDF = (req, res) => {
    const filter = req.query;
    Constructsite.find(filter)
        .then(doc => {
            if (doc.length == 0) {
                res.status(200).json({
                    message: "Site Details Not Found"
                });
            }
            else {
                let options = { format: 'Letter' };
                let filter = JSON.parse(JSON.stringify(doc[0]));
                delete filter.__v;
                delete filter._id;
                delete filter.siteStatus;
                let startdate = new Date(filter.siteInaugurationDate).toLocaleDateString();
                filter.siteInaugurationDate = startdate;
                let due = new Date(filter.tentativeDeadline).toLocaleDateString();
                filter.tentativeDeadline = due;
                filter.Adderssline1 = filter.siteAddress.AddressLine1;
                delete filter.siteAddress.AddressLine1;
                filter.City = filter.siteAddress.City;
                delete filter.siteAddress.City;
                filter.State = filter.siteAddress.State;
                delete filter.siteAddress.State;
                filter.pincode = filter.siteAddress.pincode;
                delete filter.siteAddress.pincode;
                delete filter.siteAddress;
                User.find({ user_id: filter.createdBy }).exec()
                    .then(result => {
                        // console.log(result);
                        let userName = result[0].firstName;
                        filter.createdBy = userName;
                        //console.log(filter);
                        PDF.create(pdfTemplate(filter), options).toFile(`${filter.siteId}.pdf`, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            let root = path.dirname(require.main.filename);
                            //console.log('root',root);`${root}/${filter.siteId}.pdf`
                            res.status(200).download(`${root}/${filter.siteId}.pdf`, `${filter.siteId}.pdf`, (err) => {
                                if (err) { console.log(err); }
                                fs.unlink(`${root}/${filter.siteId}.pdf`, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({
                            error: err
                        });
                    });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        });
}
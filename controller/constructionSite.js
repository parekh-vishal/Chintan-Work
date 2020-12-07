const Constructsite = require('../model/constructionSite');
const SiteRules = require('../model/siteRules');
const Authusr = require('../Authentication/tokenToUsr');

//This Function Used for Add New Site
exports.addSite = (req, res, next) => {
    Constructsite.find({ siteName: req.body.siteName }).exec()
        .then(doc => {
            const userInfo = Authusr(req);
            const userId = userInfo.id;
            console.log(userId);
            if (doc.length >= 1) {
                return res.status(409).json({
                    message: "Site already exist"
                });
            }
            else {
                let siteId;
                Constructsite.find().select('siteId').exec()
                    .then(doc => {
                        if (doc.length != 0) {
                            siteId = doc[(doc.length - 1)].siteId;
                        }
                        if (siteId == null) {
                            siteId = "site0";
                        }
                        else {
                            var dum = parseInt(siteId.replace('site', ''));
                            dum += 1;
                            siteId = 'site' + dum;
                        }
                        site = new Constructsite({
                            siteId: siteId,
                            siteName: req.body.siteName,
                            ownerName: req.body.ownerName,
                            ownerContactNo: req.body.ownerContactNo,
                            createdBy : userId,
                            siteAddress: {
                                AddressLine1: req.body.siteAddress.AddressLine1,
                                City: req.body.siteAddress.City,
                                State: req.body.siteAddress.State,
                                pincode: req.body.siteAddress.pincode
                            },
                            siteInaugurationDate: req.body.siteInaugurationDate,
                            siteEstimate: req.body.siteEstimate,
                            tentativeDeadline: req.body.tentativeDeadline
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
                            adminUsers: adminUsrArr
                        });
                        siteRule.save()
                            .then(doc => {
                                site.save()
                                    .then(doc => {
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
exports.chngSiteStatus = (req, res, next) => {
    const filter = req.query;
    Constructsite.findOne(filter).select('siteStatus').exec()
        .then(doc => {
            const status = 'Deactivated';
            doc.siteStatus = status;
            doc.save()
                .then(result => {
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
exports.editSiteSettings = (req, res, next) => {
    const filter = req.query;
    const reqBody = req.body;
    SiteRules.findOne(filter).exec()
        .then(doc => {
            const qrykeys = Object.keys(reqBody);
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
                .then(result => {
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
exports.getSite = (req, res, next) => {
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
exports.getAllSite = (req, res, next) => {
    const userInfo = Authusr(req);
    const uid = userInfo.id;
    const queryfilterJson = `{"$or" : [{"adminUsers.adminUserId":"${uid}"},{"supervisors.supervisorId" : "${uid}"},{"userExpense.expenseUserId":"${uid}"}]}`;
    const queryfilterObj = JSON.parse(queryfilterJson);
    SiteRules.find(queryfilterObj).select('siteId').exec()
        .then(doc => {
            let siteIds = [];
            for (let i = 0; i < doc.length; i++) {
                siteIds.push(doc[i].siteId);
            }
            Constructsite.find({ siteId: siteIds,siteStatus : 'Active'}).exec()
                .then(doc => {
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
exports.getSiteSetting = (req, res, next) => {
    const filter = req.query; //Query Format ?siteId=site0&amp;adminUsers.adminUserId=usr0; 
    console.log(filter);
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
exports.editSiteInfo = (req, res, next) => {
    const filter = req.body.siteId;
    Constructsite.findOneAndUpdate({ siteId: filter }, req.body).exec()
        .then(doc => {
            console.log(doc)
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

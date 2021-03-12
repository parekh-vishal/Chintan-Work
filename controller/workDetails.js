const WorkDes = require('../model/workDetails');
const WorkCategory = require('../model/workCategory');
const UserInfo = require('../Authentication/tokenToUsr');
const date = require('date-and-time');
const Util = require('../Utils/util');
const Authusr = require('../Authentication/tokenToUsr');
//Set New Work Category
exports.addWorkCategory = async (req, res, next) => {
    const userInfo = UserInfo(req);
    const orgId = userInfo.orgId;
    const orgName = await Util.getOrgName(orgId);
    WorkCategory.find({'organization.orgId': orgId}).exec()
        .then(doc => {
            const wrkId = Util.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].workId : null, "WRKC");
            const workCategory = new WorkCategory({
                workId: wrkId,
                WorkTypes: req.body.WorkTypes,
                organization : {
                    orgId : orgId,
                    orgName : orgName
                }
            });
            workCategory.save()
                .then(result => {
                    res.status(200).json({
                        message: "Work Category Added."
                    })
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
};
//Get All Work Categories
exports.getAllCategories = (req, res, next) => {
    let { page = 1, limit = 10 } = req.query;
    page = (page!=0)?page:1;
    limit = (limit!=0)?limit:10;
    const userInfo = Authusr(req);
    const {uid,orgId} = userInfo;
    const filter = JSON.parse(`{"organization.orgId" : "${orgId}"}`);
    WorkCategory.aggregate([
        { $match: filter },
        {
            $facet: {
                "stage1": [{ "$group": { _id: null, count: { $sum: 1 } } }],
                "stage2": [{ "$skip": (parseInt(page) - 1) * parseInt(limit) }, { "$limit": parseInt(limit) }]
            }
        },
        { $unwind: "$stage1" },
        {
            $project: {
                count: "$stage1.count",
                data: "$stage2"
            }
        }
    ])
        .exec()
        .then(doc=>{
            if (!doc) {
                throw "WorkCategories  Not Found"
            }
            res.status(200).send(doc);
        })
        .catch(err => {
                    console.log(err);
                    res.status(502).json({
                        error: err
                    });
                });
    // WorkCategory.find(filter).exec()
    //     .then(doc => {
    //         res.status(200).json(doc);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(502).json({
    //             error: err
    //         });
    //     });
};
//Edit WorkCategorirs
exports.editWorkCategory = (req, res, next) => {
    const filter = req.query;
    WorkCategory.findOneAndUpdate(filter, req.body).exec()
        .then(doc => {
            res.status(200).json({
                message: "Work Category Updated."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        });
}
//Add Work to System
exports.addWorkDes = (req, res, next) => {
    let uiDate = req.body.date;
    let temp = uiDate.split('/');
    temp = temp.reverse();
    let servDate = new Date();
    servDate = date.format(servDate, temp.join('-'));
    const userInfo = Authusr(req);
    const orgId = userInfo.orgId;
    WorkDes.find({orgId : orgId}).exec()
        .then(doc => {
            const workId = Util.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].workId : null,"WRK");
            workdets = new WorkDes({
                workId: workId,
                orgId : orgId,
                siteId: req.body.siteId,
                siteName: req.body.siteName,
                supervisorId: req.body.supervisorId,
                supervisorName: req.body.supervisorName,
                Works: req.body.Works,
                cementAmount: req.body.cementAmount,
                date: new Date(servDate.toString())
            });
            workdets.save()
                .then(result => {
                    res.status(200).json({
                        message: 'Work Details entered to system'
                    });
                    //  console.log('res', result);
                })
                .catch(err => {
                    console.log('error', err);
                    res.status(502).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log('error', err);
            res.status(502).json({
                error: err
            });
        });
}

//Edit Work Details by Supervisor on specific date. Date could not be changed.
exports.updateWorkdetails = (req, res, next) => {
    var saperator = '-'
    var date = req.body.date;
    date = date.split(saperator);
    date = date.reverse();
    date = date.join(saperator);
    const filter = req.body.workId;
    console.log("filrer",req.body);
    WorkDes.findOneAndUpdate({workId : filter}, req.body).exec()
        .then(doc => {
            console.log('doc',doc);
            res.status(200).json({
                message: "Work Details Updated."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
};
//Retrieve Work Deails based on particular date
exports.getWorkByDate = async (req, res, next) => {
    let filter = req.query;
    if (filter == undefined) {
        filter = null;
    }
    let { page = 1, limit = 10 } = req.query;
    page = (page != 0) ? page : 1;
    limit = (limit != 0) ? limit : 10;
    const userInfo = Authusr(req);
    const {id,orgId} = userInfo;
    filter.orgId = orgId;
    delete filter.page;
    delete filter.limit;
    const userPermission = await Util.checkUserPermission(filter);
    const {adminUser,supervisor,expneseUser} = userPermission;
    if (adminUser.includes(id)) {
        WorkDes.aggregate([
            { $match: filter },
            {
                $facet: {
                    "stage1": [{ "$group": { _id: null, count: { $sum: 1 } } }],
                    "stage2": [{ "$skip": (parseInt(page) - 1) * parseInt(limit) }, { "$limit": parseInt(limit) }]
                }
            },
            { $unwind: "$stage1" },
            {
                $project: {
                    count: "$stage1.count",
                    data: "$stage2"
                }
            }
        ])
            .exec()
            .then(doc=>{
                if (!doc) {
                    throw "Works Not Found"
                }
                res.status(200).send(doc);
            })
            .catch(err => {
                        console.log(err);
                        res.status(502).json({
                            error: err
                        });
                    });
        // WorkDes.find(filter).limit(limit*1).skip((page-1)*limit).exec()
        //     .then(result => {
        //         res.status(200).json(result);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(502).json({
        //             error: err
        //         });
        //     });
    }
    else if (supervisor.includes(id)) {
        filter.supervisorId = id;
        WorkDes.aggregate([
            { $match: filter },
            {
                $facet: {
                    "stage1": [{ "$group": { _id: null, count: { $sum: 1 } } }],
                    "stage2": [{ "$skip": (parseInt(page) - 1) * parseInt(limit) }, { "$limit": parseInt(limit) }]
                }
            },
            { $unwind: "$stage1" },
            {
                $project: {
                    count: "$stage1.count",
                    data: "$stage2"
                }
            }
        ])
            .exec()
            .then(doc=>{
                if (!doc) {
                    throw "Works Not Found"
                }
                res.status(200).send(doc);
            })
            .catch(err => {
                        console.log(err);
                        res.status(502).json({
                            error: err
                        });
                    });
        // WorkDes.find(filter).limit(limit*1).skip((page-1)*limit).exec()
        //     .then(result => {
        //         res.status(200).json(result);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(502).json({
        //             error: err
        //         });
        //     });
    }
    else {
        res.status(200).json({
            message: "You have not authorized to access Work Details!!"
        });
    }

}
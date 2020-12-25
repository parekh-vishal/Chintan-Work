const WorkDes = require('../model/workDetails');
const WorkCategory = require('../model/workCategory');
const UserInfo = require('../Authentication/tokenToUsr');
const date = require('date-and-time');
//Set New Work Category
exports.addWorkCategory = (req, res, next) => {
    WorkCategory.find().exec()
        .then(doc => {
            let wrkId;
            if (doc.length != 0) {
                wrkId = doc[(doc.length - 1)].workId;
            }
            if (wrkId == null) {
                wrkId = "WRKC0";
            }
            else {
                let dum = parseInt(wrkId.replace('WRKC', ''));
                dum += 1;
                wrkId = 'WRKC' + dum;
            }
            let workCategory = new WorkCategory({
                workId : wrkId,
                WorkTypes : req.body.WorkTypes
            });
            workCategory.save()
            .then(result=>{
                res.status(200).json({
                    message : "Work Category Added."
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
exports.getAllCategories = (req,res,next)=>{
    WorkCategory.find().exec()
    .then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({
            error: err
        });
    });
};
//Edit WorkCategorirs
exports.editWorkCategory = (req,res,next)=>{
    const filter = req.query;
    WorkCategory.findOneAndUpdate(filter,req.body).exec()
    .then(doc=>{
        res.status(200).json({
            message : "Work Category Updated."
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
    let workId;
    WorkDes.find().exec()
    .then(doc=>{
            if (doc.length != 0) {
                workId = doc[(doc.length - 1)].workId;
            }
            if (workId == null) {
                workId = "WRK0";
            }
            else {
                let dum = parseInt(workId.replace('WRK', ''));
                dum += 1;
                workId = 'WRK' + dum;
            }
            workdets = new WorkDes({
                workId : workId,
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
    
    const filter = req.body._id;
    delete req.body._id;
    WorkDes.findOneAndUpdate(filter, {...req.body}).exec()
        .then(doc => {
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
exports.getWorkByDate = (req, res, next) => {
    let filter = req.query;
    if(filter == undefined){
        filter = null;
    }
    const userInfo = UserInfo(req);
    const userId = userInfo.id;
    filter.supervisorId = userId;
    //console.log('filter',filter);
    WorkDes.find(filter).exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        });
}
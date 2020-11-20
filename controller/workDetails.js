const WorkDes = require('../model/workDetails');
const User = require('../model/user')
const date = require('date-and-time');
//Add Work to System
exports.addWorkDes = (req,res,next)=>{
        let uiDate = req.body.date;
        let temp = uiDate.split('/');
        temp = temp.reverse();
        let servDate = new Date();
        servDate = date.format(servDate,temp.join('-'));
        workdets = new WorkDes({
            siteId : req.body.siteId,
            siteName : req.body.siteName,
            supervisorId : req.body.supervisorId,
            supervisorName : req.body.supervisorName,
            works : req.body.works,
            cementAmount : req.body.cementAmount,
            date : new Date(servDate.toString())
        });
        workdets.save()
        .then(result => {
            res.status(200).json({
                message : 'Work Details entered to system'
            });
            console.log('res',result);
        })
        .catch(err =>{ 
            console.log('error',err);
            res.status(201).json({
                error : err
            });
    });
    }

//Edit Work Details by Supervisor on specific date. Date could not be changed.
exports.updateWorkdetails = (req,res,next)=>{
    var saperator = '-'
    var date = req.body.date;
    date = date.split(saperator);
    date = date.reverse();
    date = date.join(saperator);
    console.log(date);
    WorkDes.findOneAndUpdate({date:date},req.body).exec()
    .then(doc=>{
        res.status(200).json({
            message : "Work Details Updated."
        });
    })
    .catch(err=>{
        //console.log(err);
        res.status(404).json({
            error : err
        });
    });
};
//Retrieve Work Deails based on particular date
exports.getWorkByDate = (req,res,next)=>{
    let filter = req.query;
    WorkDes.find(filter).exec()
    .then(result=>{
        if(result.length == 0){
            throw 'Not found Records'
        }
        else{
        res.status(200).json(result);
    }
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : err
        });
    });
}
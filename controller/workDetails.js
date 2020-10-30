const WorkDes = require('../model/workDetails');
const User = require('../model/user')
const date = require('date-and-time');
//Add Work to System
exports.addWorkDes = (req,res,next)=>{
    User.find({contactNo : req.body.contactNo}).exec().then(result=>{
        var userId = result[0].user_id;
        var uiDate = req.body.date;
        var temp = uiDate.split('/');
        temp = temp.reverse();
        var servDate = new Date();
        servDate = date.format(servDate,temp.join('-'));
        //console.log('d',servDate.toString());
        workdets = new WorkDes({
            supervisorId : userId,
            supervisorContactNo : req.body.contactNo,
            workName : req.body.workName,
            totalworker : {
                mason : req.body.totalworker.mason,
                labour : req.body.totalworker.labour,
                male : req.body.totalworker.male,
                female : req.body.totalworker.female
            },
            workDescription : req.body.workDescription,
            cementAmount : req.body.cementAmount,
            date : new Date(servDate.toString())
        });
        workdets.save()
        .then(result => {
            //res.redirect('http://localhost:3000/userLogin');
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
}).catch(err=>{
    console.log(err);
    res.status(404).json({
        error : err
    });
});
    }

//Edit Work Details by Supervisor on specific date. Date could not be changed.
exports.updateWorkdetails = (req,res,next)=>{
    var saperator = '-'
    var date = req.params.date;
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
    var saperator = '-'
    var date = req.params.date;
    date = date.split(saperator);
    date = date.reverse();
    date = date.join(saperator);
    console.log('param ',date)
    WorkDes.find({date:date}).exec()
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
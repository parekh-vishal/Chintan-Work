const WorkDes = require('../model/workDetails');
const User = require('../model/user')
exports.addWorkDes = (req,res,next)=>{
    User.find({contactNo : req.body.contactNo}).exec().then(result=>{
        var userId = result.user_id;
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
            date : req.body.date
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
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : err
        });
    });
}
    )}
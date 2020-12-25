const User = require('../model/user');
const bcrypt = require('bcrypt'); 
const Supplier = require('../model/supplier');

//Get User Info 
exports.getUsr = (req,res,next)=>{
    var email = req.params.email;
    User.find({email:email}).select('-password').exec()
    .then(doc=>{
        //console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : err
        });
    });
}
//Retrive All Users from system
exports.getAllUsr = (req,res,next)=>{
    User.find().select('-password').exec()
    .then(doc=>{
     //   console.log("Users Found");
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : "Unable to find Users"
        });
    });
};
//Edit User Details
exports.editUsrInfo = (req,res,next)=>{
    var email = req.params.email;
    User.findOneAndUpdate({email : email},req.body).select('-password').exec()
    .then(doc=>{
        res.status(200).json({
            message : 'Info Updated'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : "User Not Found"
        })
    });
}
//E-mail Verification with System
exports.mailVerification = (req,res,next)=>{
    var mail = req.body.e-mail;
    User.find({email:mail}).select('-password').exec()
    .then(doc=>{
        res.status(200).json({
            message : "Mail Verified"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : "No User with this E-mail Not Found in System"
        })
    });
};
//Password Reset
exports.passReset = (req,res,next)=>{
    var mail = req.body.email;
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error : err
            });
        }
        else{
            User.findOneAndUpdate({email:mail},{password:hash}).exec()
            .then(doc=>{
                res.status(200).json({
                    message : "Password Successfully Changed"
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(404).json({
                    error : err
                });
            });
        }
    });
};
//Add supplier details to system
exports.suppliers = (req,res,next)=>{
    var supplier = new Supplier({
        supervisorNo : req.body.supervisorNo,
        supplierName : req.body.supplierName,
        supplierContactNo : req.body.supplierContactNo,
        consitementDetails : req.body.consitementDetails
    });
    supplier.save().exec()
    .then(result =>{
        console.log(result);
        res.status.json({
            message : 'Supplier Details added'
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : err
        });
    });
}
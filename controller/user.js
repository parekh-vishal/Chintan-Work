const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Supplier = require('../model/supplier');
//This function create new user and save it to the database
exports.addUser = (req, res, next) => {
    User.find({email : req.body.email}).exec().then(user =>{
        if(user.length >=1){
            return res.status(409).json({
                message : "User already exist"
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error : err
                    });
                }
                else{
                    var uid;
                    var user;
                    User.find().select('user_id').exec()
                    .then(doc=>{
                        if(doc.length!=0){
                            uid = doc[(doc.length-1)].user_id;
                        }
                        if(uid==null){
                            uid = "usr0"
                        }
                        else{
                            var dum = parseInt(uid.replace('usr',''));
                            dum+=1;
                            uid = 'usr'+dum;

                        }
                        user = new User({
                            user_id : uid,
                            firstName: req.body.firstName,
                            lastName : req.body.lastName,
                            contactNo : req.body.contactNo,
                            email : req.body.email,
                            password :hash 
                        });
                        user.save().then(result => {
                            //res.redirect('http://localhost:3000/userLogin');
                            res.status(200).json({
                                message : 'User Added'
                            });
                            console.log('res',result);
                        })
                            .catch(err =>{ 
                                console.log('error',err);
                                res.status(201).json({
                                    error : err
                                });
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(404).json({
                            error : err
                        });
                    });
                }
            });
        }
    });
}

//This function used for login use
exports.logUser = (req, res, next)=>{
    User.find({email : req.body.email}).exec()
    .then(user =>{
        if(user.length <1){
            return res.status(401).json({
                message : 'Login Failed'
            });
           }
        bcrypt.compare(req.body.password,user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message : 'Login Failed'
                });
            }
            if(result){
                console.log(process.env.JWT_KEY);
               const token = jwt.sign({
                    contactNo : user[0].contactNo,
                    userId : user[0]._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn : "1h"
                }
                );
                return res.status(200).json({
                    message : 'Login Successful',
                    token : token
                });
            } 
            res.status(401).json({
                message : 'Login Failed'
            });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
};
//Get User Info 
exports.getUsr = (req,res,next)=>{
    var email = req.params.email;
    User.find({email:email}).select('-password').exec()
    .then(doc=>{
        console.log(doc);
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
        console.log("Users Found");
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
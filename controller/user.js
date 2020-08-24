const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//This function create new user and save it to the database
exports.addUser = (req, res, next) => {
    User.find({contactNo : req.body.contactNo}).exec().then(user =>{
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
    User.find({contactNo : req.body.contactNo}).exec()
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

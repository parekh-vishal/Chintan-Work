const User = require('../model/user');
const Token = require('../model/token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { update } = require('../model/user');

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
    User.findOne({email : req.body.email}).exec()
    .then(user =>{
        if(!user){
            return res.status(401).json({
                message : 'User Not Found'
            });
           }
        bcrypt.compare(req.body.password,user.password)
        .then(doMatch=>{
           const token = jwt.sign({
                email : user.email,
            }, 
            process.env.JWT_KEY,
            {
                expiresIn : "24h"
            }
            );
            var email = user.email;
            let addTkn = new Token({
                mail : email,
                token:token
            });
            addTkn.save().then(doc=>{
                if(doMatch){
                    res.status(200).json({
                        message : 'Login Successful',
                        token : token,
                        email : email
                    });
                }
                 else{
                    res.status(401).json({
                    message : 'Invalid Password'
                });
                }
            }).catch(err=>{
                console.log(err);
            });
        }).catch(err=>{
            console.log(err);
            res.status(401).json({
                message : 'Login Failed'
            });
        })
    })
    .catch(err=>{
        console.log("error",err);
        res.status(500).json({
            error : err
        });
    });
};

//LogOut feature
exports.logoutUser = (req,res,next)=>{
    /* req.session.destroy((err)=>{
         if(err){
             console.log(err);
             res.status(400).json({
                 error : 'Log Out Error'
             })
         }
         res.status(200).json({
             message : "User Logged Out"
         })
     });*/
    const tkn = req.headers.authorization.split(" ")[1] || req.body.token;
    Token.findOne({token : tkn})
    .then(doc=>{
     console.log(doc);
        if(doc.token!=null){
             Token.remove({token : tkn}).exec()
             .then(result=>{
                 res.status(200).json({
                     message : 'Logged Out'
                 });
             })
             .catch(err=>{
                 console.log(err);
                 res.status(400).json({
                     message : 'error in logged out'
                 });
             });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : "Token not found"
        })
    }); 
 };

 //Refresh Token Mechanism 
 //When Token expires UI Client fire api to this function get new api to avoid LogIn Process
 //This function call database to find user token and email if found it regenerate token add to DB and remove old token.
 exports.refrshTkn = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1] || req.body.token;
    //New Token 
    const email = req.params.email;
    const nwTkn = jwt.sign({
        email : email,
    }, 
    process.env.JWT_KEY,
    {
        expiresIn : "24h"
    }
    );
    const filter = {mail:email};
    const update = {token:nwTkn};
    Token.findOneAndUpdate(filter,update).exec()
    .then(doc=>{
        res.status(200).json({
            message : 'Token Updated',
            token : nwTkn
        }); 
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : "User Not Found With Token"
        });
    });
 };
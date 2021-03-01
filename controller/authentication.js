const User = require('../model/user');
const Token = require('../model/token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Util = require('../Utils/util')
const mailer = require('nodemailer');
const Authusr = require('../Authentication/tokenToUsr');
const encryption = require('../Authentication/encryption');

//This function create new user and save it to the database
exports.addUser = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "User already exist"
            });
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    User.find().select('user_id').exec()
                        .then(doc => {
                            if(!doc){
                                throw "Users Not Found";
                            }
                            const uid = Util.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].user_id : null,"USR");
                            const user = new User({
                                user_id: uid,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                contactNo: req.body.contactNo,
                                email: req.body.email,
                                password: hash
                            });
                            user.save().then(result => {
                                //res.redirect('http://localhost:3000/userLogin');
                                res.status(200).json({
                                    message: 'User Added'
                                });
                                //console.log('res', result);
                            })
                                .catch(err => {
                                    console.log('error', err);
                                    res.status(201).json({
                                        error: err
                                    });
                                });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(404).json({
                                error: err
                            });
                        });
                }
            });
        }
    });
}

//This function used for login use
exports.logUser = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'User Not Found'
                });
            }
            const filter = req.body.email;
            Token.findOne({ mail: filter }).exec().then(doc => {
                if (doc == null || doc.length == 0) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(doMatch => {
                            const token = jwt.sign({
                                id: user.user_id,
                                email: user.email,
                                name: user.firstName
                            },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "24h"
                                }
                            );
                            let email = user.email;
                            let _user = user.toObject();
                            delete _user.password;
                            delete _user.__v;
                            delete _user._id;
                            let addTkn = new Token({
                                mail: email,
                                token: token
                            });
                            addTkn.save().then(doc => {
                                if (doMatch) {
                                    res.status(200).json({
                                        message: 'Login Successful',
                                        token: token,
                                        ..._user
                                    });
                                }
                                else {
                                    res.status(200).json({
                                        message: 'Invalid Password'
                                    });
                                }
                            }).catch(err => {
                                console.log(err);
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(401).json({
                                message: 'Login Failed'
                            });
                        })
                }
                else {
                    console.log(doc);
                    bcrypt.compare(req.body.password, user.password)
                        .then(doMatch => {
                            let email = user.email;
                            let _user = user.toObject();
                            delete _user.password;
                            delete _user.__v;
                            delete _user._id;
                            if (doMatch) {
                                res.status(200).json({
                                    message: 'Login Successful',
                                    token: doc.token,
                                    ..._user
                                });
                            }
                            else {
                                res.status(200).json({
                                    message: 'Invalid Password'
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(401).json({
                                message: 'Login Failed'
                            });
                        })
                }
            }).catch(err => {
                console.log("error", err);
                res.status(502).json({
                    error: err
                });
            });
        })
        .catch(err => {
            console.log("error", err);
            res.status(502).json({
                error: err
            });
        });
};

//LogOut feature
exports.logoutUser = (req, res, next) => {
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
    Token.findOne({ token: tkn })
        .then(doc => {
            //console.log(doc);
            if (doc.token != null) {
                Token.remove({ token: tkn }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Logged Out'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({
                            message: 'error in logged out'
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: "Token not found"
            })
        });
};

//Refresh Token Mechanism 
//When Token expires UI Client fire api to this function get new api to avoid LogIn Process
//This function call database to find user token and email if found it regenerate token add to DB and remove old token.
exports.refrshTkn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1] || req.body.token;
    //New Token 
    const email = req.params.email;
    User.findOne({ email: email }).select('-password').exec()
        .then(doc => {
            if (!doc) { throw err }
            else {
                const nwTkn = jwt.sign({
                    id: doc.user_id,
                    email: doc.email,
                    name: doc.firstName
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "24h"
                    }
                );
                const filter = { mail: email };
                const update = { token: nwTkn };
                Token.findOneAndUpdate(filter, update).exec()
                    .then(doc => {
                        res.status(200).json({
                            message: 'Token Updated',
                            token: nwTkn
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).json({
                            error: "User Not Found With Token"
                        });
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

//This function Handle e-mail verification with system and send an Verification Link to User to set a new Password
exports.mailVerify = (req,res,next)=>{
    const email = req.body.email;
    User.findOne({email:email}).select('email').exec()
    .then(doc=>{
        if(!doc){
            res.status(200).json({
                message : "User Does not Exist"
            });
        }
        else{
            let transport = mailer.createTransport({
                service : 'outlook',
                port: 587,
                auth: {
                    user : 'vishalparekh130@hotmail.com',
                    pass : 'VishalP@1306'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let encodemail = encryption.encoding(Buffer.from(email,'utf-8'));
            let mailOption = {
                from : 'vishalparekh130@hotmail.com',
                to : email,
                subject : 'Password Reset Link',
                text : 'sfs'//Link : localhost:3000/authenticate/setNewPass?encodedmail
            };
            transport.sendMail(mailOption,(err,info)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(info.response);
                    //console.log(encodemail);
                    res.status(200).json({
                        message : 'mail sent',
                        key : encodemail 
                    });
                }
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

//Set A New Password
exports.passReset = (req,res,next)=>{
    const encodedmail = req.query;
   // console.log('en',encodedmail);
    let a = JSON.parse(JSON.stringify(encodedmail));
    const decoded = encryption.decoding(a);
    console.log('decoded',decoded);
    let mail = decoded;
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
                res.status(502).json({
                    error : err
                });
            });
        }
    });
};
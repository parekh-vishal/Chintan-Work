const express = require('express');
const route = express.Router();
const user = require('../controller/user');
const checkAuth = require('../Authentication/check_auth');
//Get Particular User Info
route.get('/getUsr/:email',checkAuth,user.getUsr);
//Get All Users list from system
route.get('/getAllUsr',checkAuth,user.getAllUsr);
//Forget Password Two Step 
//1. E-mail Verification
route.post('/usrEmail',user.mailVerification);
//2. Password Reset
route.post('/usrPass',user.passReset);
//Edit User Details
route.post('/editDetails/:email',checkAuth,user.editUsrInfo);
//Supplier Route
route.post('/supplier',checkAuth,user.suppliers);
module.exports = route;
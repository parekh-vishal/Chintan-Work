const express = require('express');
const route = express.Router();
const usrAuth = require('../controller/authentication');
const user = require('../controller/user');
const checkAuth = require('../Authentication/check_auth');
//Sign Up route
route.post('/SignUp',usrAuth.addUser);
//Log In route
route.post('/SignIn',usrAuth.logUser);
//Log Out route
route.get('/Logout',checkAuth,usrAuth.logoutUser);
//Referece Token Route
route.get('/refershTkn/:email',usrAuth.refrshTkn);
//Forget Password E-mail verification link
route.post('/mailVerification',usrAuth.mailVerify);
//Set New Password API
route.post('/setNewPass',usrAuth.passReset);
module.exports = route;
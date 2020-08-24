const express = require('express');
const route = express.Router();
const user = require('../controller/user');
//Sign Up route
route.post('/SignUp',user.addUser);
//Sign In route
route.post('/SignIn',user.logUser);
//Inser Data to system route
//Get All Data form system route
//Get data for particular date route
//Log Out route
module.exports = route;
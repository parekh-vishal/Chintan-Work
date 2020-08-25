const express = require('express');
const route = express.Router();
const user = require('../controller/user');
const checkAuth = require('../Authentication/check_auth');
//Sign Up route
route.post('/SignUp',user.addUser);
//Sign In route
route.post('/SignIn',user.logUser);
//Supplier Route
route.post('/supplier',checkAuth,user.suppliers);
module.exports = route;
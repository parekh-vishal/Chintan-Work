const express = require('express');
const route = express.Router();
const work = require('../controller/workDetails');
const checkAuth = require('../Authentication/check_auth');
//Push WorkDetails in system
route.post('/addWorkDetails',checkAuth,work.addWorkDes);
//Edit WorkDetails on specific date.
route.post('/editWorkDetails/:date',work.updateWorkdetails);
//Get WorkDetails by date
route.get('/getWorkDetailByDate/:date',checkAuth,work.getWorkByDate);
module.exports = route;
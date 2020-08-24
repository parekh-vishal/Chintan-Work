const express = require('express');
const route = express.Router();
const work = require('../controller/workDetails');
//Push WorkDetails in system
route.post('/addWorkDetails',work.addWorkDes);
module.exports = route;
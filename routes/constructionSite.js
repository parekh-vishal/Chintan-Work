const express = require('express');
const route = express.Router();
const constructSite = require('../controller/constructionSite');
const checkAuth = require('../Authentication/check_auth');
const work = require('../controller/workDetails');
//Add a new Site in System
route.post('/addNewSite',checkAuth,constructSite.addSite);
//Site Settings
route.post('/siteSettings',checkAuth,constructSite.siteSettings);
//Edit Site Settings
route.post('/editSiteSettings',checkAuth,constructSite.editSiteSettings);
//Get Site By siteId
route.get('/getSite/:siteId',checkAuth,constructSite.getSite);
//Get All Site
route.get('/getAllSite',checkAuth,constructSite.getAllSite);
//Edit Site Info
route.post('/editSiteInfo',checkAuth,constructSite.editSiteInfo);
//Push WorkDetails in system
route.post('/addWorkDetails',work.addWorkDes);
//Edit WorkDetails on specific date.
route.post('/editWorkDetails',work.updateWorkdetails);
//Get WorkDetails by date
route.get('/getWorkDetail',work.getWorkByDate);

//Add Payment Info in site

module.exports = route;
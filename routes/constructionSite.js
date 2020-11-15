const express = require('express');
const route = express.Router();
const user = require('../controller/user');
const constructSite = require('../controller/constructionSite');
const checkAuth = require('../Authentication/check_auth');
const constructionSite = require('../model/constructionSite');
//Add a new Site in System
route.post('/addNewSite',checkAuth,constructSite.addSite);
//Get Site By siteId
route.get('/getSite/:siteId',checkAuth,constructSite.getSite);
//Get All Site
route.get('/getAllSite',checkAuth,constructSite.getAllSite);
//Edit Site Info
route.post('/editSiteInfo/:siteName',checkAuth,constructSite.editSiteInfo);
//Add Payment Info in site
//Site Assignment to Supervisor/User
route.post('/supAssign/:siteId');
//Site Deassignment to Supervisor

module.exports = route;
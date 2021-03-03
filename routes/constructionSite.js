const express = require('express');
const route = express.Router();
const constructSite = require('../controller/constructionSite');
const checkAuth = require('../Authentication/check_auth');
const work = require('../controller/workDetails');
const inventory = require('../controller/siteInventory');
//Add a new Site in System
route.post('/addNewSite',checkAuth,constructSite.addSite);
//Change Site Status to Deactive
route.get('/chngStatus',checkAuth,constructSite.chngSiteStatus)
//Get Site Settings
route.get('/getSiteSettings',checkAuth,constructSite.getSiteSetting); 
//Edit Site Settings
route.post('/editSiteSettings',checkAuth,constructSite.editSiteSettings);
//Get Site By siteId
route.get('/getSite/:siteId',checkAuth,constructSite.getSite);
//Get All Site
route.get('/getAllSite',checkAuth,constructSite.getAllSite);
//Edit Site Info
route.post('/editSiteInfo',checkAuth,constructSite.editSiteInfo);
//Create PDF of Construction Site Info.
route.get('/createSitePdf',checkAuth,constructSite.generatePDF);
//Set Work Category in System
route.post('/addWorkCategory',checkAuth,work.addWorkCategory);
//Get All Work Categories
route.get('/getAllCategories',checkAuth,work.getAllCategories);
//Edit Work Category
route.post('/editWorkCategory',checkAuth,work.editWorkCategory)
//Push WorkDetails in system
route.post('/addWorkDetails',checkAuth,work.addWorkDes);
//Edit WorkDetails on specific date.
route.post('/editWorkDetails',checkAuth,work.updateWorkdetails);
//Get WorkDetails by date
route.get('/getWorkDetail',checkAuth,work.getWorkByDate);

//Site Inventory Details
route.post('/addMaterialToInventory',checkAuth,inventory.addmaterialToInventory);

//Get Site Inventory by siteId
route.get('/getSiteInventory',checkAuth,inventory.getSiteInventory);

//Edit Site Inventory Details
route.post('/editSiteInventory',checkAuth,inventory.editSiteInventory);

module.exports = route;
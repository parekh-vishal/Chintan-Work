const express = require('express');
const organization = require('../controller/organization');
const checkAuth = require('../Authentication/check_auth');
const route = express.Router();

//Add New Organization
route.post('/insertOrg',checkAuth,organization.addOrg);

//Edit Organization Info
route.post('/editOrg',checkAuth,organization.editOrgInfo);

//Change Organization Status 
route.get('/chngOrgStatus',checkAuth,organization.orgStatusUpdate);

//Get Org By OrgName 
route.get('/getOrg',checkAuth,organization.getOrgByName);

module.exports = route;
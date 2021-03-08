const Organization = require('../model/organization');
const Utils = require('../Utils/util');
//Add Organization Function
exports.addOrg = (req, res, next) => {
    Organization.find({ orgName: req.body.orgName }).exec()
        .then(doc => {
            if (doc.length >= 1) {
                return res.status(409).json({
                    message: "Organization already exist"
                });
            }
            else {
                let orgId ;
                Organization.find().select('orgId').exec()
                    .then(doc => {
                        if(!doc){
                            throw "Users Not Found";
                        }
                        orgId = Utils.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].orgId : null,"ORG")
                        let org = new Organization({
                            orgId: orgId,
                            orgName: req.body.orgName,
                            orgOwnerName: req.body.orgOwnerName,
                            orgAddress: {
                                AddressLine1: req.body.orgAddress.address,
                                City: req.body.orgAddress.city,
                                State: req.body.orgAddress.state,
                                pincode: req.body.orgAddress.pincode
                            }
                        });
                        org.save()
                            .then(doc => {
                                res.status(200).json({
                                    message: "Organization Added"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(502).json({
                                    error: err
                                });
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        });
};

//Edit Organization Function
exports.editOrgInfo = (req,res,next)=>{
    const filter = req.body.orgName;
    Organization.findOneAndUpdate({orgName:filter},req.body).exec()
    .then(doc=>{
        res.status(200).json({
            message : "Organization Info Updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({
            error: err
        });
    });
};

//Organization Status Update
exports.orgStatusUpdate = (req,res,next)=>{
    const filter = req.query;//orgId
    Organization.findOne(filter).select('orgStatus').exec()
    .then(doc=>{
        const status = 'Deactivated';
        doc.orgStatus = status;
        doc.save()
        .then(()=>{
            res.status(200).json({
                message: 'Organization Status Updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({
            error: err
        });
    });
}

//Get Organization By OrgName
exports.getOrgByName = (req,res,next)=>{
    const filter = req.query;
    Organization.findOne(filter).exec()
    .then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({
            error: err
        });
    });
};
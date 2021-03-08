const Material = require('../model/siteInventory')
const SiteRule = require('../model/siteRules');
const Constructionsite = require('../model/constructionSite');
const Authusr = require('../Authentication/tokenToUsr');
const Util = require('../Utils/util');
//Add Material to the site Inventory
exports.addmaterialToInventory = (req, res, next) => {
    const userInfo = Authusr(req);
    const userId = userInfo.id;
    const userName = userInfo.name;
    const orgId = userInfo.orgId;
    Material.find({orgId : orgId}).select('metId').exec()
        .then(doc => {
            const metId = Util.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].metId : null,"MET");
            const materialInfo = new Material({
                metId: metId,
                siteId: req.body.siteId,
                siteName: req.body.siteName,
                supervisorId: userId,
                supervisorName: userName,
                materialType: req.body.materialType,
                materialUnit: req.body.materialUnit,
                materialTotalQuantity: req.body.materialTotalQuantity,
                pricePerUnit: req.body.pricePerUnit,
                invoicePrice: req.body.invoicePrice,
                invoiceNo: req.body.invoiceNo,
                date: req.body.date,
                supplier: req.body.supplier,
                remarks: req.body.remarks
            });
            materialInfo.save()
                .then(() => {
                    res.status(200).json({
                        message: "Material Added"
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        });
};

//Get Inventory Details
exports.getSiteInventory = async (req, res, next) => {
    const filter = req.query; //It should be Site Id and Supervisor
    const userInfo = Authusr(req);
    const uid = userInfo.id;
    const uname = userInfo.name;
    const orgId  = userInfo.orgId;
    filter.orgId = orgId;
    const userPermission =await Util.checkUserPermission(filter);
    const {adminUser, supervisor, expneseUser} = userPermission;
    delete filter.orgId;
    if (adminUser.includes(uid) || expneseUser.includes(uid)) {
        Material.find(filter).exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(502).json({
                    error: err
                });
            });
    }
    else if (supervisor.includes(uid)) {
        const qFilter = JSON.parse(`{"$and": [{"siteId" :"${req.query.siteId}"},{"supervisorId":"${uid}"}]}`);
        Material.find(qFilter).exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(502).json({
                    error: err
                });
            });
    }
    else {
        res.status(200).json({
            message: "You have not authorized to access Site Inventory!!"
        });
    }
};

//Edit Site Inventory
exports.editSiteInventory = (req, res, next) => {
    const filter = req.query; //It should regdId
    const {metId} = req.body;
    Material.findOneAndUpdate({metId}, req.body).exec()
        .then(doc => {
            res.status(200).json({
                message: "Inventory Details Updated"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                error: err
            });
        });
};
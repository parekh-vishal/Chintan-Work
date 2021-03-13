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
    Material.find({ orgId: orgId }).select('metId').exec()
        .then(doc => {
            const metId = Util.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].metId : null, "MET");
            const metId = Util.createIDs(doc[(doc.length - 1)] ? doc[(doc.length - 1)].metId : null,"MET");
            const date = Util.isoDateToString(req.body.date);
            const materialInfo = new Material({
                metId: metId,
                orgId: orgId,
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
                date: date,
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
    if(Object.keys(filter).length === 0){
        return res.status(200).json({
            message : "PLease select Site"
        });
    } 
    let { page = 1, limit = 10 } = req.query;
    page = (page != 0) ? page : 1;
    limit = (limit != 0) ? limit : 10;
    const userInfo = Authusr(req);
    const {id,orgId} = userInfo;
    filter.orgId = orgId;
    delete filter.page;
    delete filter.limit;
    const userPermission = await Util.checkUserPermission(filter);
    const { adminUser, supervisor, expneseUser } = userPermission;
    if (adminUser.includes(id) || expneseUser.includes(id)) {
        Material.aggregate([
            { $match: filter },
            {
                $facet: {
                    "stage1": [{ "$group": { _id: null, count: { $sum: 1 } } }],
                    "stage2": [{ "$skip": (parseInt(page) - 1) * parseInt(limit) }, { "$limit": parseInt(limit) }]
                }
            },
            { $unwind: "$stage1" },
            {
                $project: {
                    count: "$stage1.count",
                    data: "$stage2"
                }
            }
        ])
            .exec()
            .then(doc=>{
                if (!doc) {
                    throw "Materials  Not Found"
                }
                res.status(200).send(doc);
            })
            .catch(err => {
                        console.log(err);
                        res.status(502).json({
                            error: err
                        });
                    });
        // Material.find(filter).limit(limit*1).skip((page-1)*limit).exec()
        //     .then(doc => {
        //         res.status(200).json(doc);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(502).json({
        //             error: err
        //         });
        //     });
    }
    else if (supervisor.includes(id)) {
        const qFilter = JSON.parse(`{"$and": [{"siteId" :"${req.query.siteId}"},{"supervisorId":"${id}"},{"orgId":"${orgId}"}]}`);
        Material.aggregate([
            { $match: qFilter },
            {
                $facet: {
                    "stage1": [{ "$group": { _id: null, count: { $sum: 1 } } }],
                    "stage2": [{ "$skip": (parseInt(page) - 1) * parseInt(limit) }, { "$limit": parseInt(limit) }]
                }
            },
            { $unwind: "$stage1" },
            {
                $project: {
                    count: "$stage1.count",
                    data: "$stage2"
                }
            }
        ])
            .exec()
            .then(doc=>{
                if (!doc) {
                    throw "Materials  Not Found"
                }
                res.status(200).send(doc);
            })
            .catch(err => {
                        console.log(err);
                        res.status(502).json({
                            error: err
                        });
                    });
        // Material.find(qFilter).limit(limit * 1).skip((page - 1) * limit).exec()
        //     .then(doc => {
        //         res.status(200).json(doc);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(502).json({
        //             error: err
        //         });
        //     });
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
    const { metId } = req.body;
    Material.findOneAndUpdate({ metId }, req.body).exec()
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
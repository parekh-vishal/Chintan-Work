const Material = require('../model/siteInventory')
const SiteRule = require('../model/siteRules');
const Authusr = require('../Authentication/tokenToUsr');
//Add Material to the site Inventory
exports.addmaterialToInventory = (req, res, next) => {
    const userInfo = Authusr(req);
    const userName = userInfo.name;
    const siteId = req.query.siteId;
    Material.find().select('metId').exec()
        .then(doc => {
            let metId;
            if (doc.length != 0) {
                metId = doc[(doc.length - 1)].metId;
            }
            if (metId == null) {
                metId = "MET0"
            }
            else {
                let dum = parseInt(metId.replace('MET', ''));
                dum += 1;
                metId = 'MET' + dum;
            }
            const materialInfo = new Material({
                metId: metId,
                siteId: siteId,
                supervisorName: userName,
                materialType: req.body.materialType,
                materialUnit : req.body.materialUnit,
                materialTotalQuantity : req.body.materialTotalQuantity,
                pricePerUnit: req.body.pricePerUnit,
                invoicePrice: req.body.invoicePrice,
                invoiceNo: req.body.invoiceNo,
                date: req.body.date
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
exports.getSiteInventory = (req, res, next) => {
    const filter = req.query; //It should be Site Id and Supervisor
    const userInfo = Authusr(req);
    const uid = userInfo.id;
    const uname = userInfo.name;
    SiteRule.find(filter).exec()
        .then(doc => {
            let adminUser = [];
            let supervisor = [];
            let expneseUser = [];
            for (let i = 0; i < doc[0].adminUsers.length; i++) {
                adminUser.push(doc[0].adminUsers[i].adminUserId);
            }
            for (let i = 0; i < doc[0].supervisors.length; i++) {
                supervisor.push(doc[0].supervisors[i].supervisorId);
            }
            for (let i = 0; i < doc[0].userExpense.length; i++) {
                expneseUser.push(doc[0].supervisors[i].expenseUserId);
            }
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
                const qFilter = JSON.parse(`{"$and": [{"siteId" :"${req.query.siteId}"},{"supervisorName":"${uname}"}]}`);
                console.log(qFilter);
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
                    message : "You have not authorized to access Site Inventory!!"
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

//Edit Site Inventory
exports.editSiteInventory = (req, res, next) => {
    const filter = req.query; //It should regdId
    Material.findOneAndUpdate(filter, req.body).exec()
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
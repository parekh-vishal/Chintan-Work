const Material = require('../model/siteInventory')
const Authusr = require('../Authentication/tokenToUsr');
//Add Material to the site Inventory
exports.addmaterialToInventory = (req, res, next) => {
    const userInfo = Authusr(req);
    const userName = userInfo.name;
    const siteId = req.query.siteId;
    Material.find().select('regdId').exec()
        .then(doc => {
            let regdId;
            if (doc.length != 0) {
                regdId = doc[(doc.length - 1)].regdId;
            }
            if (regdId == null) {
                regdId = "REGD0"
            }
            else {
                let dum = parseInt(regdId.replace('REGD', ''));
                dum += 1;
                regdId = 'REGD' + dum;
            }
            const materialInfo = new Material({
                regdId:regdId,
                siteId: siteId,
                supervisorName: userName,
                materialType: req.body.materialType,
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
    console.log(filter);
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
};

//Edit Site Inventory
exports.editSiteInventory = (req,res,next) => {
    const filter = req.query; //It should regdId
    Material.findOneAndUpdate(filter,req.body).exec()
    .then(doc=>{
        res.status(200).json({
            message : "Inventory Details Updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({
            error: err
        });
    });
};
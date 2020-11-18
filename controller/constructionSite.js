const { compare } = require('bcrypt');
const Constructsite = require('../model/constructionSite');


//This Function Used for Add New Site
exports.addSite = (req,res,next)=>{
    Constructsite.find({siteName : req.body.siteName}).exec()
    .then(doc=>{
        if(doc.length >=1){
            return res.status(409).json({
                message : "Site already exist"
            });
        }
        else{
            let siteId;
            Constructsite.find().select('siteId').exec()
            .then(doc=>{
                if(doc.length!=0){
                    siteId = doc[(doc.length-1)].siteId;
                }
                if(siteId==null){
                    siteId = "site0";
                }
                else{
                    var dum = parseInt(siteId.replace('site',''));
                    dum+=1;
                    siteId = 'site'+dum;
                }
                site = new Constructsite({
                    siteId : siteId,
                    siteName : req.body.siteName,
                    ownerName : req.body.ownerName,
                    ownerContactNo : req.body.ownerContactNo,
                    siteAddress : { AddressLine1 : req.body.AddressLine1,
                                    City : req.body.City,
                                    State : req.body.State,
                                    pincode : req.body.pincode},
                    siteInaugurationDate : req.body.siteInaugurationDate,
                    siteEstimate : req.body.siteEstimate,
                    tentativeDeadline : req.body.tentativeDeadline,
                    supervisors : req.body.supervisors
                });
                site.save()
                .then(doc=>{
                    res.status(200).json({
                        message : "Site Added"
                    });
                })
                .catch(err=>{
                    console.log(err);
                    res.status(400).json({
                        error : err
                    });
                });
            })
            .catch(err=>{
                console.log(err);
                res.status(400).json({
                    error : err
                });
            });
            
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({
            error : err
        });
    })
};

//Site Settings for Newly Created Site which consist of rules on Supervisors accessibility
exports.siteSettings = (req,res,next)=>{
    let siteId = req.body.siteId;

}
//Get Site by SiteID
exports.getSite = (req,res,next)=>{
    const siteId = req.params.siteId;
    Constructsite.findOne({siteId:siteId}).exec()
    .then(doc=>{
        if(!doc){
            throw err;
        }
        else{
            res.status(200).json(doc);
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message : "Site Not Found",
            error : err
        });
        })
}
//Get All Site Function
exports.getAllSite = (req,res,next)=>{
    Constructsite.find().exec()
    .then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message : "Site Not Found!!"
        });
    })
};
//Edit Site Info Funcion
exports.editSiteInfo = (req,res,next)=>{
    const filter = req.params.siteName;
    Constructsite.findOneAndUpdate({siteName:filter},req.body).exec()
    .then(doc=>{
        console.log(doc)
        res.status(200).json({
            message : "Site Info Updated"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error : err
        });
    });
};

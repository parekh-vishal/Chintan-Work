const jwt = require('jsonwebtoken');
//Edit this module with store token in db then on each req query to db and if found then only verify
//On logout we remove token from db so query will return null so authentication fails even if it could pass verify function
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1] || req.body.token;
        console.log("token",token);
        const decode = jwt.verify(token,process.env.JWT_KEY);
        console.log("decode",decode);
        req.userData = decode;
        next();
    }
    catch(error){
        return res.status(401).json({
            message : 'Authentication Failed'
        });
    }
}
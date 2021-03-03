const jwt = require('jsonwebtoken');
const Token = require('../model/token');
//On logout we remove token from db so query will return null so authentication fails even if it could pass verify function
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.body.token;
        Token.findOne({ token: token }).exec()
            .then(doc => {
                if (!doc) {
                    throw err;
                }
                else {
                    const decode = jwt.verify(token, process.env.JWT_KEY);
                    //req.userData = decode;
                    next();
                }
            })
            .catch(err => {
                return res.status(401).json({
                    message: 'Expired Token'
                });
            });
    }
    catch (error) {
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }
    /* if(!req.session.isLoggedIn){
         return res.status(401).json({
             message : 'Authentication Failed'
         });
     }*/
};

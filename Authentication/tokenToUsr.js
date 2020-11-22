const jwt = require('jsonwebtoken');
//Fetch UserInfo From Token
module.exports = (req)=>{
    const token = req.headers.authorization.split(" ")[1] || req.body.token;
    const decode = jwt.verify(token,process.env.JWT_KEY);    
    return decode;
}
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/env');

const requiSignin = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({
        error: "@authenticate/missing-token",
        message: "Token not sent"
    });

    const invalidTokenMessage = {
        error: '@authenticate/invalid-token',
        message: 'Token provided is invalid',
    }

    const token = authorization.split(' ')[1];

    if(!token) return res.status(401).json(invalidTokenMessage);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
          console.log(err);
          return res.status(401).json(invalidTokenMessage);
        }

        req.user = decoded;
    
        return next();
    })

}

const verifyAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(401).json({
            error: "@authenticate/verifyAdmin",
            message: "Admin access danied"
        });
    }

    return next();

}

const verifyUser = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'user') {
        return res.status(401).json({
            error: "@authenticate/verifyUser",
            message: "User access danied"
        });
    }

    return next();

}

module.exports = {
    requiSignin,
    verifyAdmin,
    verifyUser
}
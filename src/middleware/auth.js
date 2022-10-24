const jwt = require('jsonwebtoken');
const User = require('../db/model/UsersModel');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token.trim(), 'supersecret');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token.trim()});
        if (!user) {
            throw Error('User not found');
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth;
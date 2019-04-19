const check = (req, res, next) => {
    'use strict';
    if (req.session.userType === undefined || req.session.userType < 2) {
        res.fatal(401, "need admin");
    } else next();
};

module.exports = check;
const check = (req, res, next) => {
    'use strict';
    if (req.session.wechatId === undefined) {
        res.sessionFail(401);
    } else {
        next();
    }
}

module.exports = check;
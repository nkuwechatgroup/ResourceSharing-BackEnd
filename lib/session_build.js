const db = require('../database/db');
const util = require('util');

const sessionBuild = async (req, res, next) => {
    'use strict';
    if ((req.session !== undefined && req.session.wechatId !== undefined) ||
        req.body.wechatId === undefined || req.body.password === undefined
    ) {
        // console.log(req.session);
        next();
    } else {
        // 数据库最大连接数，pool
        const query = "SELECT * FROM rs_en_user WHERE wechatId=? AND password=? LIMIT 1";
        const params = [req.body.wechatId, req.body.password];
        const results = await db.query(query, params);
        if (results.length > 0) {
            req.session.wechatId = req.body.wechatId;
            req.session.userId = results[0].userId;
            req.session.userScore = results[0].userScore;
            req.session.userType = results[0].userType;
        }
        next();
        //else delelte???error
    }
};

module.exports = sessionBuild;
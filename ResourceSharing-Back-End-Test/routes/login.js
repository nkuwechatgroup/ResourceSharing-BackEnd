const router = require('express').Router();
const db = require('../database/db');

/**
 * @api {post} /logout 退出登录
 * @apiDescription 退出登录
 * @apiName logout
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup api
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 错误信息
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *  "code":0,
 *  "message":"ok"
 *   }
 * @apiVersion 1.0.0
 */
router.post('/logout', async (req, res) => {
    'use strict';
    delete req.session;
    res.ok();
});

/**
 * @api {post} /refresh 刷新登录状态
 * @apiDescription 刷新登录状态
 * @apiName refresh
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup api
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 错误信息
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok"
 *   }
 * @apiVersion 1.0.0
 */
router.post('/refresh', async (req, res) => {
    'use strict';
    const query = "SELECT * FROM rs_en_user WHERE wechatId=? AND password=? LIMIT 1";
    const params = [req.body.wechatId, req.body.password];
    const results = await db.query(query, params);
    if (results.length === 0) {
        res.fail(...errArr);
    } else {
        req.session.wechatId = req.body.wechatId;
        req.session.userId = results[0].userId;
        req.session.userScore = results[0].userScore;
        req.session.userType = results[0].userType;
        res.ok();
    }
});


const errArr = [422, [{name: 'name', message: 'might be wrong'}, {
    name: 'password',
    message: 'might be wrong'
}], 'login failed']


/**
 * @api {post} /login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup api
 * @apiParam {wechatId} string 用户名
 * @apiParam {password} string 密码
 * @apiParamExample {json} Param-Example:
 * {
 *     "wechatId":"IdName",
 *     "password":"Password"
 * }
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 错误信息
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "code":0,
 *      "message":"ok"
 *  }
 * @apiError LoginFailed 422
 * @apiErrorExample Error-Response:
 * {
 *   "code": 422,
 *   "message": "login failed",
 *   "error": [
 *       {
 *           "name": "name",
 *           "message": "might be wrong"
 *       },
 *       {
 *           "name": "password",
 *           "message": "might be wrong"
 *       }
 *   ]
 *   }
 * @apiVersion 1.0.0
 */

// 登陆验证
router.post('/login', async (req, res) => {
    'use strict';

    const query = "SELECT * FROM rs_en_user WHERE wechatId=? AND password=? LIMIT 1";
    const params = [req.body.wechatId, req.body.password];
    const results = await db.query(query, params);
    if (results.length === 0) {
        res.fail(...errArr);
    } else {
        req.session.wechatId = req.body.wechatId;
        req.session.userId = results[0].userId;
        req.session.userScore = results[0].userScore;
        req.session.userType = results[0].userType;
        res.ok();
    }
});


module.exports = router;
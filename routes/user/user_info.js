const router = require('express').Router();
const db = require('../../database/db');
const usrFetch = require('../../lib/user_fetch');

/**
 * @api {get} /user/:usrName/info 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName user-info
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup user
 * @apiParam {String} usrName 用户名
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 状态信息
 * @apiSuccess  wechatId 用户名
 * @apiSuccess  score   积分
 * @apiSuccess  userType  用户类型
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok",
 *  "data":{
 *  "wechatId":"test",
 *  "score":100,
 *  "userType":0
 *  }
 *   }
 * @apiError BadRequest 400
 * @apiErrorExample Error-Response:
 * {
 *   "code": 400,
 *   "message": "bad request",
 *   "error": "don't have that user"
 *  }
 * @apiVersion 1.0.0
 */
router.get('/:usrName/info', async (req, res) => {
    'use strict';
    const usrName = req.params.usrName;
    const results = await usrFetch(usrName);
    if (results.length === 0) {
        res.fatal(400, "don't have that user");
    } else {
        const info = {
            wechatId: results[0].wechatId,
            score: results[0].score,
            userType: results[0].userType
        };
        res.ok(info);
    }
});

module.exports = router;
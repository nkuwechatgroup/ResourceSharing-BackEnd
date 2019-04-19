const router = require('express').Router();
const db = require('../../database/db');

const superCheck = (req, res, next) => {
    'use strict';
    if (req.session.userType === undefined || req.session.userType < 3) {
        res.fatal(401, "need super admin");
    } else next();
};


/**
 * @api {put} /admin/:usrName/set 设置管理员
 * @apiDescription 设置管理员
 * @apiName admin-set
 * @apiHeader {String} cookie 用户授权cookie，超级管理员权限
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup admin
 * @apiParam {String} usrName 用户名
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 状态信息
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok"
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
router.put('/:usrName/set', superCheck, async (req, res) => {
    const usrName = req.params.usrName;
    'use strict';
    console.log(usrName);
    const query = 'UPDATE rs_en_user SET userType = ? WHERE wechatId = ?';
    const params = [2, usrName];
    const results = await db.query(query, params);
    if (results.affectedRows === 0) {
        res.fatal(400, "don't have that user");
    } else {
        res.ok();
    }
});


/**
 * @api {delete} /admin/:usrName/set 移除管理员
 * @apiDescription 管理员权限降级
 * @apiName admin-remove
 * @apiHeader {String} cookie 用户授权cookie，超级管理员权限
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup admin
 * @apiParam {String} usrName 用户名
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 状态信息
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok"
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
router.delete('/:usrName/set', superCheck, async (req, res) => {
    const usrName = req.params.usrName;
    'use strict';
    const query = 'UPDATE rs_en_user SET userType = ? WHERE wechatId = ?';
    const params = [2, usrName];
    const results = await db.query(query, params);
    if (results.affectedRows === 0) {
        res.fatal(400, "don't have that user");
    } else {
        console.log(`${usrName} was admin-removed`);
        res.ok();
    }
})
;

module.exports = router;
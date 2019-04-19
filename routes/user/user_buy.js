const router = require('express').Router();
const db = require('../../database/db');


/**
 * @api {post} /user/file/buy 兑换资源
 * @apiDescription 用户兑换资源
 * @apiName user-buy
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup user
 * @apiParam {Integer} fileId 兑换文件ID
 * @apiParamExample {json} Param-Example:
 * {
 *     "fileID":233;
 * }
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 错误信息
 * @apiError ParamsLack 410
 * @apiError AlreadyOwnIt 411
 * @apiError ScoreLack 412
 * @apiVersion 1.0.0
 */
router.post('/file/buy', async (req, res) => {
    if (req.body.fileId === undefined) res.fatal(410, "params lack");

    // 是否已存在关系
    let query = "SELECT * FROM rs_rel_own WHERE userId=? AND fileId=?";
    let params = [req.session.userId, req.body.fileId];
    let results = await db.query(query, params);
    if (results.length !== 0) {
        res.fatal(411, "already own it");
        res.end();
    }
    // 获取用户积分
    query = "SELECT * FROM rs_en_user WHERE userId=?";
    params = [req.session.userId];
    results = await db.query(query, params);
    const userScore = results[0].userScore;

    // 获取资源积分
    query = "SELECT * FROM rs_en_file WHERE fileId=?";
    params = [req.body.fileId];
    results = db.query(query, params);
    const fileScore = results[0].needScore;
    if (userScore < fileScore) {
        res.fatal(412, "score lack");
        res.end();
    }

    // 更新拥有关系
    query = "INSERT INTO rs_rel_own VALUES (?,?)";
    params = [req.body.fileId, req.session.userId];
    results = await db.query(query, params);

    // 更新用户积分
    query = "UPDATE rs_en_user SET userScore = ? WHERE userId = ? ";
    params = [userScore - fileScore, req.session.userId];
    results = await db.query(query, params);

    res.ok();
});

module.exports = router;
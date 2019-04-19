const router = require('express').Router();
const db = require('../../database/db');

/**
 * @api {post} /user/post/add 用户增添帖子
 * @apiDescription 用户增添帖子
 * @apiName post-add
 * @apiGroup user
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 * @apiParam {String} type 帖子分类
 * @apiParam {Integer} score 帖子征求积分
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 状态信息
 * @apiSuccess  postId  帖子ID
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok",
 *  "data":{
 *  "postId":"1234"
 *  }
 *   }
 * @apiError BadRequest 400
 * @apiErrorExample Error-Response:
 * {
 *   "code": 400,
 *   "message": "bad request",
 *   "error": "params lack"
 *  }
 * @apiVersion 1.0.0
 */
router.post('/post/add', async (req, res) => {
    if (req.body.title === undefined || req.body.content === undefined ||
        req.body.type === undefined || req.body.score === undefined) {
        res.fatal(400, "params lack");
    }
    const query = "INSERT INTO rs_en_post VALUES (?,?,?,?,?,?)";
    const params = [req.session.wechatId, req.body.title, req.body.content,
        req.body.type, req.body.score, Date.now()];
    const results = await db.query(query, params);
    res.ok();
});

/**
 * @api {post} /user/comment/add 用户增添评论
 * @apiDescription 用户增添评论
 * @apiName comment-add
 * @apiGroup user
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiParam {String} content 评论内容
 * @apiParam {Integer} postId 对应帖子ID
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 状态信息
 * @apiSuccess  comId  评论ID
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok",
 *  "data":{
 *  "comId":"1234"
 *  }
 *   }
 * @apiError BadRequest 400
 * @apiErrorExample Error-Response:
 * {
 *   "code": 400,
 *   "message": "bad request",
 *   "error": "params lack"
 *  }
 * @apiVersion 1.0.0
 */
router.post('/comment/add', async (req, res) => {
    if (req.body.postId === undefined || req.body.content === undefined) {
        res.fatal(400, "params lack");
    }
    const query = "INSERT INTO rs_en_comment VALUES (?,?,?,?)";
    const params = [req.body.postId, req.session.wechatId,
        req.body.content, Date.now()];
    const results = await db.query(query, params);
    res.ok();
});

module.exports = router;
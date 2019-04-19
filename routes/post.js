const router = require('express').Router();
const db = require('../../database/db');

// 获取帖子
/**
 * @api {get} /post/:cid 获取帖子信息
 * @apiDescription 获取帖子信息
 * @apiName post-info
 * @apiGroup api
 * @apiParam {String} usrName 用户名
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 状态信息
 * @apiSuccess  postId 帖子ID
 * @apiSuccess  title    帖子标题
 * @apiSuccess  content  帖子内容
 * @apiSuccess  user    发帖用户
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok",
 *  "data":{
 *  "postId":"test",
 *  "title":100,
 *  "content":0
 *  }
 *   }
 * @apiError BadRequest 400
 * @apiErrorExample Error-Response:
 * {
 *   "code": 400,
 *   "message": "bad request",
 *   "error": "don't have that post"
 *  }
 * @apiVersion 1.0.0
 */
router.get('./post/:cid', async (req, res) => {
    const cid = req.params.cid;
    const query = 'SELECT * FROM rs_en_post WHERE postId=?';
    const params = [cid];
    const results = await db.query(query, params);
    if (results.length === 1) {
        res.ok(results[0]);
    } else {
        res.fatal(400, "don't have that post");
    }
});

module.exports = router;
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const conf = require('../../config/conf_path');
const db = require('../../database/db');

const admin_upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, conf.FILE_PATH);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now().toString(36)}${Math.floor(Math.random() * 100).toString(36)}${path.extname(file.originalname)}`)
        }
    })
});

/**
 * @api {post} /user/file/upload 上传单个文件
 * @apiDescription 用户上传单个文件
 * @apiName user-upload
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup user
 * @apiParam {file} file 上传文件
 * @apiParam {String} fileName 上传文件名称
 * @apiParam {String} fileType 上传文件分类
 * @apiParam {int} needScore 所需积分
 * @apiParamExample {json} Param-Example:
 * {
 *     "fileName":"资料.doc",
 *     "fileType":"公共资源",
 *     "needScore":10
 * }
 * @apiSuccess  code 返回状态码
 * @apiSuccess  message 错误信息
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "code":0,
 *  "message":"ok"
 *   }
 * @apiVersion 1.0.0
 */
router.post('/file/upload', admin_upload.single('file'), (req, res) => {
    if (!req.file) return res.fail(1);

    if (req.body.fileType === undefined || req.body.fileName === undefined ||
        req.body.needScore === undefined) {
        res.fatal(400, "params lack");
    }

    const query = 'INSERT INTO rs_en_file VALUE (?,?,?,?,?,?,?,?,?,?)';
    const params = [null, req.session.wechatId, Date.now(),
        req.file.size, req.body.fileType, req.body.fileName,
        req.file.filename, 0, req.body.needScore, 0];
    const results = db.query(query, params);
    console.log(results);
    res.ok();
});

// 查询
router.post('/my_upload', (req, res) => {
    // 查询rs_rel_up
    //...
});

module.exports = router;

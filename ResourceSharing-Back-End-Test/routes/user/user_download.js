const router = require('express').Router();
const conf = require('../../config/conf_path');


/**
 * @api {post} /user/file/download 下载文件
 * @apiDescription 用户下载单个文件
 * @apiName user-downlaod
 * @apiHeader {String} cookie 用户授权cookie
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "cookie": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org"
 *     }
 * @apiGroup user
 * @apiParam {Integer} fileId 下载文件ID
 * @apiParamExample {json} Param-Example:
 * {
 *     "fileID":233;
 * }
 * @apiSuccess  file
 * @apiError ParamsLack 410
 * @apiError NotOwnIt 411
 * @apiError FileError 412
 * @apiVersion 1.0.0
 */
router.post('/file/download', async (req, res) => {
    if (req.body.fileId === undefined) res.fatal(410, "params lack");
    let query = "SELECT * FROM rs_rel_own WHERE userId=? AND fileId=?";
    let params = [req.session.userId, req.body.fileId];
    let results = await db.query(query, params);
    if (results.length === 0 && req.session.userType < 2) {
        res.fatal(411, "not own it");
    } else {
        query = "SELECT * FROM rs_en_file WHERE fileId=?";
        params = [req.body.fildId];
        results = await db.query(query, params);
        if (results.length === 0) {
            res.fatal(402, "file error");
        } else {
            res.sendFile(conf.FILE_PATH + results[0].hashName);
        }
    }
});

router.get('/my_download', (req, res) => {

});

module.exports = router;
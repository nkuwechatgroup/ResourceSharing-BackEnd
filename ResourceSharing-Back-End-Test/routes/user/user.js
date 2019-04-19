const router = require('express').Router();
const info = require('./user_info');
const upload = require('./user_upload');
const download = require('./user_download');
const check = require('./user_check');
const usrPost = require('./user_post');
const buy = require('./user_buy');

router.use(check);
router.use(info);
router.use(upload);
router.use(download);
router.use(buy);
router.use('/post', usrPost);

module.exports = router;
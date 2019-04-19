const router = require('express').Router();
const upload = require('./admin_upload');
const user_check = require('../user/user_check');
const admin_check = require('./admin_check');
const admin_super = require('./admin_super');

router.use(user_check);
router.use(admin_check);
router.use('/', upload);
router.use(admin_super);

module.exports = router;
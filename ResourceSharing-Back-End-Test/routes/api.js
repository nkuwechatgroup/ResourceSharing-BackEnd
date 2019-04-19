// create index，download，buy，
const router = require('express').Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const prototype = require('../lib/prototype');
const admin = require('./admin/admin');
const user = require('./user/user');
const login = require('./login');
const pwdHash = require('../lib/pwd_hash');
const sessionMake = require('../lib/session_build');

// post中间件
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// response状态码中间件
router.use(prototype.setResponsePrototype);

// session中间件
router.use(session( {
    secret: 'Brighten the Day!',    // session签名
    name: 'sessionId',  // 保存在本地的名称
    resave: false,
    saveUninitialized: true,    // 未初始化强制存储
    cookie: {
        maxAge: 1000 * 60 * 60 * 1, // SESSION有效时间
        secure: false   // true: https only
    }
}));

// 密码加密中间件
router.use(pwdHash);
router.use(sessionMake);

// 路由
router.use('/admin', admin);
router.use('/user', user);
router.use(login);

// 全路由匹配，即未定义的路由
router.use(function (req, res) {
    console.log(req.ip, req.path);
    res.fatal(500);
});

module.exports = router;


var express = require('express');
var router = express.Router();
const UserService=require("../services/user-services.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录 post请求/api/users/login.do 登录处理  app.js写了前面的一节，就可以只写后面的路径
router.post('/login.do',UserService.login);

//注册
router.post('/register.do',UserService.register);

//注销
router.post('/logout.do',UserService.logout);

module.exports = router;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session=require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionsRouter = require('./routes/position');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//添加session功能
app.use(session({
  secret: 'asdsxdcvferr',//密钥
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:30*60*1000}
}));

//判断，用户如果未登录，则不能访问和职位处理相关的资源
app.use(function(req,res,next){
	//获取请求中保存的用户信息
	const user=req.session.loginUser;
	//判断 如果访问和“position”相关资源，用户未登录，则跳转页面
	if(!user && req.url.indexOf("position") !==-1){
		res.redirect("/");
		return;
	}
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);//前端访问的是/api/users/路径下的资源，就会找到routes/users.js文件
app.use('/api/positions', positionsRouter);//访问/api/positins/目录下的资源

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

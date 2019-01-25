/* 用户相关的业务逻辑处理 */

const UserDao=require("../dao/user-dao.js");
const crypto = require('crypto');

const UserService={
	//用于登录业务逻辑处理
	login:function(req,res,next){
		//从请求中获取登录的用户名与密码
		const {username,password}=req.body;//post请求中传递的数据
		//const {username,password}=req.query;//get请求中传递的数据
		//console.log(username,password);
		//res.send("用户名："+username+"，密码："+password);
		
		//从数据库中查询用户信息，然后比对密码
		UserDao.find({username:username}).then(function(data){
			//data是查询返回的数据 是一个数组结构，包含所有满足条件的结果集
			if(data.length===1){//数据库中恰好仅有一条数据满足条件
				//比较密码 先加密
				const cipher = crypto.createCipher('aes192', 'apass');
				let encryptedl = cipher.update(password,'utf8', 'hex');
				encryptedl += cipher.final('hex');
				if(data[0].password===encryptedl){//密码相同，能够登录成功
					//将登录成功的用户信息保存到session中
					req.session.loginUser=username;
					//响应的数据json格式 返回数据
					res.json({
						res_code:1,
						res_error:"",
						res_body:{
							status:1,
							message:"登录成功",
							data:{
								username:username
							}
						}
					});
				}else{//密码不同
					res.json({
						res_code:1,
						res_error:"",
						res_body:{
							status:0,
							message:"密码错误",
							data:{}
						}
					});
				}
			}else{//没有找到用户
				res.json({
					res_code:1,
					res_error:"",
					res_body:{
						status:0,
						message:"用户名不存在",
						data:{}
					}
				});
			}
			
		});
	},
	//用户注册业务逻辑处理
	register:function(req,res,next){
		const {username,password,email}=req.body;//post请求中传递的数据
		//注册
		UserDao.find({username}).then((data)=>{
			if(data.length>0){//已经被注册过
				res.json({
					res_code:1,
					res_error:"",
					res_body:{
						status:0,
						message:"用户名已存在",
						data:{}
					}
				});
			}else{//用户名没有被占用
				//对密码做加密处理
				const cipher = crypto.createCipher('aes192', 'apass');
				let encrypted = cipher.update(password,'utf8', 'hex');
				encrypted += cipher.final('hex');
				//调保存方法
				UserDao.save({username,password:encrypted,email}).then((data)=>{
					//将注册成功的用户信息保存到session中
					req.session.loginUser=username;
					// data保存成功会将保存成功后的数据返回
					res.json({
						res_code:1,
						res_error:"",
						res_body:{
							status:1,
							message:"用户名注册成功",
							data:data
						}
					});
				});
			}
		});
	},
	//用户注销服务器业务逻辑
	logout(req,res,next){
		req.session.loginUser=null;
		res.json({
			res_code:1,
			res_error:"",
			res_body:{
				status:1,
				message:"用户名注销成功",
				data:{}
			}
		});
	},
	check(){}
	
};

module.exports=UserService;
const PositionDao=require("../dao/position-dao.js");

const PositionService={
	//添加职位的业务逻辑处理
	add(req,res,next){
		//获取请求中传递的职位信息
		const {position,company,salary}=req.body;
		let logo="";
		if(req.file){
			logo="/images/upload/"+req.file.filename;
			//保存数据到数据库
			PositionDao.save({logo,position,company,salary}).then((data)=>{
				//响应的数据json格式 返回数据
				res.json({
					res_code:1,
					res_error:"",
					res_body:{
						status:1,
						message:"添加成功",
						data:data
					}
				});
			});
		} 
		//res.send("cheng");
	},
	update(req,res,next){
		res.send("update");
	}
};

module.exports=PositionService;
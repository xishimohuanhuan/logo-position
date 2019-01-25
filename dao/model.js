const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/h51809",{useNewUrlParser: true});

//用户数据结构
const userSchema=new mongoose.Schema({
	username:String,
	password:String,
	email:String
});

//职位数据结构
const positionSchema=new mongoose.Schema({
	logo:String,
	company:String,
	position:String,
	salary:Number
});

//用户Model
const UserModel=mongoose.model("user",userSchema);//实际生成"users"集合(表)
const PositionModel=mongoose.model("position",positionSchema);//会生成"position"的集合

//定义模块 导出
module.exports={UserModel,PositionModel};
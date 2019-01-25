var express = require('express');
var router = express.Router();
const PositionService=require("../services/position-service.js");
const path=require("path");

//上传文件中间件配置
const multer=require("multer");
//磁盘存储配置
const storage = multer.diskStorage({
	//目标目录
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../public/images/upload/"));//要指一个绝对路径 在服务器端找的
  },
  //文件名称
  filename: function (req, file, cb) {
	  //const ext=file.originalname.split(".").pop();
	  const ext=file.originalname.slice(file.originalname.lastIndexOf("."));//文件后缀名
    cb(null, file.fieldname + '-' + Date.now()+ext);
  }
});
 
var upload = multer({ storage: storage });

//添加职位
//post /api/positions/add.do  logo是表单里面的name属性
router.post("/add.do",upload.single("logo"),PositionService.add);

//修改职位信息  post
router.post("/update.do",upload.single("logo"),PositionService.update);


module.exports = router;

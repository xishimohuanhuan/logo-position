require.config({
	baseUrl:"/",
	paths:{//不写后缀名,对象属性这里可以不加引号
		"jquery":"libs/jquery/jquery-1.12.4.min",
		"bootstrap":"libs/bootstrap/js/bootstrap.min",
		"swiper":"libs/swiper/js/swiper.min",
		"header":"js/common/header",
		"login":"js/common/login",
		"register":"js/common/register",
		"template":"libs/art-template/template-web"
	},
	shim:{//bootstrap垫片 依赖于jquery
		"bootstrap":{
			deps:["jquery"]
		}
	}
});
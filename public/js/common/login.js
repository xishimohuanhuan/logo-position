/* 登录的模态框的引入和js代码 */
define(["jquery"],function(){
	class LoginModal{
		constructor() {
		   this.init();
		   this.addListen();
			 this.modellogin();
		}
		init(){
			/* 登录模态框的结构拼接 */
			let modeal=`<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel">
						  <div class="modal-dialog" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="loginModalLabel">用户登录</h4>
							  </div>
							  <div class="modal-body">
								<div class="alert alert-danger hidden error-login">用户名或密码错误</div>
								<form class="login-form">
								  <div class="form-group">
									<label for="loginUsername">用户名</label>
									<input type="text" class="form-control" name="username" id="loginUsername" placeholder="输入用户名">
								  </div>
								  <div class="form-group">
									<label for="loginPassword">密码</label>
									<input type="password" class="form-control" name="password" id="loginPassword" placeholder="输入密码">
								  </div>
								  <div class="checkbox">
									<label>
									  <input type="checkbox"> 记住我
									</label>
								  </div>
								</form>
							  </div>
							  <div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
								<button type="button" class="btn btn-primary btn-loginn">登录</button>
							  </div>
							</div>
						  </div>
						</div>`;
			/* 创建登录模态框的节点 */
			$("body").append(modeal);
		}
		/* 登录事件监听 */
		addListen(){
			/* 登录处理 */
			$(".btn-loginn").on("click",function(){
				//判断输入信息
				let userna=$("#loginUsername").val().trim();
				let passlog=$("#loginPassword").val();
				let flag="";
				//判断输入的用户名是否输入
				if(userna){
					flag +=1;
				}else{
					confirm("用户名不能为空！");
				}
				//判断密码是否输入
				if(passlog){
					flag +=2;
				}else{
					confirm("密码不能为空！");
				}
				const url="/api/users/login.do",
							data=$(".login-form").serialize();
				if(flag==="12"){
					/* 发送post请求 */
					$.post(url,data,(res)=>{
						//判断是否登录成功
						if(res.res_code &&res.res_body.status){
							/* 登录成功 */
							/* 登陆成功隐藏警告框 */
							$(".error-login").addClass("hidden");
							/* 登录成功隐藏登录模态框 */
							$("#loginModal").modal("hide");
							//登录成功后存的登录信息
							sessionStorage.setItem("keyname",res.res_body.data.username);
							//登录成功后刷新页面
							window.location.reload();
						}else{
							/* 登录失败 显示警告框 */
							$(".error-login").removeClass("hidden");
						}
					},"json");
				}
			});
		}
		//处理登录模态框
		modellogin(){
			//bootstrap提供的方法
			$('#loginModal').on('hidden.bs.modal',function(e){
				//模态框消失后执行的事件
			$("#loginUsername").val("");
			$("#loginPassword").val("");
				
		});
		}
	}
	return LoginModal;
});
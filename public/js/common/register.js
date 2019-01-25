/* 创建注册的模态框 */
define(["jquery"],function(){
	class Register{
		constructor(){
		    this.init();
			this.listenregister();
			this.addform();
			this.modelregister();
		}
		init(){
			let regismodal=`<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										<h4 class="modal-title" id="registerModalLabel">用户注册</h4>
									</div>
									<div class="modal-body">
									<div class="alert alert-danger hidden error-register-l">注册失败</div>
									<div class="alert alert-danger hidden error-register">用户名重复</div>
										<form class="register-form">
										<div class="form-group">
											<label for="registerUsername">用户名</label>
											<input type="text" class="form-control" name="username" id="registerUsername" placeholder="输入用户名">
										</div>
										<div class="form-group">
											<label for="registerEmail">邮箱</label>
											<input type="email" class="form-control" name="email" id="registerEmail" placeholder="输入邮箱">
										</div>
										<div class="form-group">
											<label for="registerPassword">密码</label>
											<input type="password" class="form-control" name="password" id="registerPassword" placeholder="输入密码">
										</div>
										<div class="form-group">
											<label for="registerPassword1">再次密码</label>
											<input type="password" class="form-control" id="registerPassword1" placeholder="再次输入密码">
										</div>
										</form>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
										<button type="button" class="btn btn-primary btn-register">注册</button>
									</div>
									</div>
								</div>
								</div>`;
			$("body").append(regismodal);
			}
		//注册信息
		listenregister(){
			//验证用户名是否存在
			$("#registerUsername").on("blur",function(){
				//用户名表单验证
				if($(this).val().trim()){
					//失去焦点发送一个请求
					//const url="http://rap2api.taobao.org/app/mock/124733/api/users/check.do";
					const url="/api/users/register.do";
					$.post(url,{username:$(this).val().trim()},(res)=>{
						//判断是否请求成功
						//console.log(res.res_body.status);
						if(res.res_body.status){
							//隐藏错误提示
							$(".error-register").addClass("hidden");
						}else{
							//显示错误提示
							$(".error-register").removeClass("hidden");
						}
					});
				}
			});
		}
		//注册表单提交验证
		addform(){
			$(".btn-register").on("click",()=>{
				//let reguser=/^[a-zA-Z0-9_-]{1,}$/,//用户名正则
				let	regemail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,//邮箱正则
					regpassword=/^[a-zA-Z0-9]{6,10}$/,//密码长度6-10
					flag=true;
				//用户名的判断
				if(! $("#registerUsername").val().trim()){
					flag=false;
					confirm("用户名不能为空！");
					return ;
				}
				//判断邮箱
				if(! regemail.test($("#registerEmail").val().trim())){
					flag=false;
					confirm("请输入正确的邮箱！");
					return ;
				}
				//判断密码
				if(! regpassword.test($("#registerPassword").val().trim())){
					flag=false;
					confirm("请输入6-10位密码(a-zA-Z0-9)！");
					return ;
				}
				//再次输入密码
				if(! ($("#registerPassword").val().trim()===$("#registerPassword1").val().trim())){
					flag=false;
					confirm("输入密码不一致！");
					return ;
				}
				//注册完整就发送后台保存
				if(flag){
					const url="/api/users/register.do",
						data=$(".register-form").serialize();
						//console.log($(".register-form"));
					/* 发送post请求 */
					$.post(url,data,(res)=>{
						//判断是否注册成功
						if(res.res_code && res.res_body.status){
							/* 注册成功 */
							confirm("注册成功！请登录...");
						}else{
							/* 注册失败 显示警告框 */
							$(".error-register-l").removeClass("hidden");
						}
					},"json");
				}
			});
		}
		//处理登录模态框
		modelregister(){
			//bootstrap提供的方法
			$('#registerModal').on('hidden.bs.modal',function(e){
				//模态框消失后执行的事件
			$("#registerUsername").val("");
			$("#registerEmail").val("");
			$("#registerPassword").val("");
			$("#registerPassword1").val("");
		})
		}
	}
	return Register;
	
});
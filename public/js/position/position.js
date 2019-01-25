/* 职位 */
require(["../config"],function(){
	require(["template","header","bootstrap","jquery"],function(template){
			class Active{
				constructor(){
				    this.init();
					this.addposition();
					this.loadbypage();
					this.pagination();
					this.updateposition();
				}
				init(){
					/* 处理头部的样式 跳转到position页面的头部样式 */
					$(".pos-hea").addClass("active").siblings().removeClass("active");
				}
				/* 添加职位 */
				addposition(){
					$(".btn-position").on("click",function(){
						//const url="http://rap2api.taobao.org/app/mock/124733/api/positions/add.do";
								//data=$(".position-add").serialize();
						/* 发送ajax请求 适合普通的文本字符串 上传的文件不行 */
						//$.post(url,data,(res)=>{
							//console.log(res);
							
						//});
						const url="/api/positions/add.do";
						//如果需要上传文件，则使用FormData对象
						const formdata=new FormData($(".position-add")[0]);//包装FormData对象 找到对应的表单元素
						//利用$.ajax()提交上传文件的数据 里面需要上传二进制流的文件
						$.ajax({
							type:"post",
							url:url,
							data:formdata,
							contentType:false,//不使用默认的"'application/x-www-form-urlencoded"类型
							processData:false,//不处理data对象数据，默认是会转换为字符串的
							success:(res)=>{
								console.log(res);
							}
							
						});
					});
				}
				/* 分页加载数据 */
				loadbypage(page=1){
					const url="http://rap2api.taobao.org/app/mock/123756/api/position/list.do?page"+page;
					/* 去接口请求数据来渲染页面 */
					$.getJSON(url,(res)=>{
						/* 找到当前页面的全部职位信息来加载 */
						const html=template("list-template",{list:res.res_body.data});
						$(".list-body").html(html);
					});
				}
				
				/* 翻页处理 */
				pagination(){
					let _this=this;
					/* 点击页码 */
					$(".pagination").on("click",".btn-page",function(){
						let pages=$(this).html();
						_this.loadbypage(pages);
					})
				}
				/* 修改职位信息 */
				updateposition(){
					$(".list-body").on("click",".btn-update",function(){
						//得到当前条修改职位信息的数据
						const tr=$(this).parents("tr");
						const _id=tr.data("id"),//这是主键
							  logo=tr.find(".logo").attr("src"),//公司logo
							  company=tr.find(".company").text(),//公司名字
							  position=tr.find(".position").text(),//职位
							  address=tr.find(".address").text(),//公司地址
							  salary=tr.find(".salary").text();//薪资
						/* 渲染到模态框中去 */
						$(".position-update .logo-url").text(logo);
						$(".position-update .company-name").val(company);
						$(".position-update .position-name").val(position);
						$(".position-update .address-add").val(address);
						$(".position-update .salary-ma").val(salary);
						$("#update-hidden ").val(_id);
					});
				}
			}
			new Active();
			
		});
});
require(["../config"],function(){
	require(["swiper","header","bootstrap","jquery"],function(Swiper){
		/* 轮播图 */
		function Index(){
			this.loadCarouse();
		}
		//扩展原型
		$.extend(Index.prototype,{
			loadCarouse(){//在对象里面简写
				new Swiper ('.swiper-container', {
					loop: true, // 循环模式选项
					
					// 如果需要分页器
					pagination: {
					el: '.swiper-pagination',
					},
					
					// 如果需要前进后退按钮
					navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
					}
				});
			}
		});
		new Index();
		
		
		       
	});
});
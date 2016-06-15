//1、(function($){})(jQuery);这样写的好处：避免全局依赖，避免第三方破环，兼容jQuery操作符"$"和"jQuery"
//2、jQuery插件的开发包括两种：
//①、类级别的插件：
//给jQuery添加新的全局函数，相当于给jQuery类本身添加方法。也就是$.extend().
//②、对象级别的插件：
//给jQuery对象添加方法，也就是$.fn.extend();
//3、插件开发骨架：
// ;(function($) {
//   //定义插件
//   $.fn.foo = function(options) {
//     //doSomething...
//   }
//   //私有函数
//   function debug() {
//     //doSomething...
//   }
//   //定义暴露函数
//   $.fn.foo.sayColor = function() {
//     //doSomething...
//   }
//   //插件默认参数
//   $.fn.foo.default = {
//     color: '#000',
//     backgroundColor: 'red'
//   }
// })(jQuery);
(function($){
	$.fn.trsAlert = function(options){
		var defaultOptions = {
			paddingL:"80px",
			paddingR:"80px",
			paddingT:"50px",
			paddingB:"50px",
			ftSize:"32px",
			bgCr:"#fff",
			fontColor:"#000",
			bdr:"1px solid #ccc",
			cont:"成功"
		};
		var ops = $.extend(defaultOptions,options);
		var box = $("<div>").css({
			"padding-left":ops.paddingL,
			"padding-right":ops.paddingR,
			"padding-top":ops.paddingT,
			"padding-bottom":ops.paddingB,
			"border":ops.bdr,
			"font-size":ops.ftSize,
			"font-color":ops.fontColor,
			"background-color":ops.bgCr
		}).html(ops.cont).appendTo($("body"));
		box.css({
			"margin-left":-(box.outerWidth(true)/2),
			"margin-top":-(box.outerHeight(true)/2)
		});
		// setTimeout(function(){
		// 	box.remove();
		// },2000);
	};
})(jQuery);
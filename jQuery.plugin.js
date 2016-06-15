//jQuery.fn.插件名myPlugin
jQuery.fn.myPlugin = function(){

};

//将jQuery传递给一个自我执行的封闭程序，jQuery在此程序中映射为$符号
(function($){
	$.fn.myPlugin = function(){

	};
})(jQuery);

//在插件的范围里， this关键字代表了这个插件将要执行的jQuery对象,这里容易产生一个普遍的误区，因为在其他包含callback的jQuery函数中，this关键字代表了原生的DOM元素。(不是很明白)
(function($){
	$.fn.myPlugin = function(){
		//此处没有必要将this包在$中如$(this),因为this已经是一个jQuery对象。
		this.fadeIn("normal",function(){
			//此处回调函数中的this关键字代表一个DOM元素
		})
	}
})(jQuery);

//确保一个插件的可链性，需要给插件返回this关键字
(function($){
	$.fn.myPlugin = function(){
		//返回this关键字
		return this.each(function(){

		});
	};
})(jQuery)

//设置默认值和选项
(function($){
	$.fn.myPlugin = function(options){
		//创建一下默认值，拓展任何被提供的选项
		var settings = $.extend({
			"location":"top",
			"background-color":"blue"
		},options)
	};
})(jQuery);

//插件方法
//在任何情况下，一个单独的插件不应该在jQuery.fnjQuery.fn对象里有多个命名空间。
(function ($) {

    $.fn.tooltip = function (options) {
        // this
    };
    $.fn.tooltipShow = function () {
        // is
    };
    $.fn.tooltipHide = function () {
        // bad
    };
    $.fn.tooltipUpdate = function (content) {
        // !!!
    };

})(jQuery);


//正确的用法：这种类型的插件架构允许您封装所有的方法在父包中，通过传递该方法的字符串名称和额外的此方法需要的参数来调用它们。 这种方法的封装和架构类型是jQuery插件社区的标准，它被无数的插件在使用。
(function ($) {

    var methods = {
        init: function (options) {
            // this
        },
        show: function () {
            // is
        },
        hide: function () {
            // good
        },
        update: function (content) {
            // !!!
        }
    };

    $.fn.tooltip = function (method) {

        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }

    };

})(jQuery);

//调用init方法
$('div').tooltip();

//调用init方法
$('div').tooltip({
    foo: 'bar'
});

// 调用hide方法
$('div').tooltip('hide');

//调用Update方法
$('div').tooltip('update', 'This is the new tooltip content!');

//编写插件的总结：
// 1.始终包裹在一个封闭的插件：
// . 代码如下:
// (function($) {
// /* plugin goes here */
// })(jQuery);

// 2.不要冗余包裹this关键字在插件的功能范围内
// 3.除非插件返回特定值，否则总是返回this关键字来维持chainability 。
// 4.传递一个可拓展的默认对象参数而不是大量的参数给插件。
// 5.不要在一个插件中多次命名不同方法。
// 3.始终命名空间的方法，事件和数据。
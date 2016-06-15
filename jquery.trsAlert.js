/*
 * 弹窗效果
 * Author:Maroon
 * Date: 2016-06-15
 * Description: 弹窗类型分为两种，一种是提示框，不带标题和按钮，会自动消失；一种是消息框，带有标题和按钮，不会自动消失。默认效果为一个只有提示内容的提示框，1.2秒后自动消失
 * params:
 * dftTitle:弹窗标题
 * text：弹窗内容
 * type：弹窗类型，success/error/warning
 * dftClass: 弹窗默认样式
 * cancelButtonText: 关闭按钮文本内容
 * confirmButtonText: 确认按钮文本内容
 * showCancelButton: 是否显示关闭按钮
 * showConfirmButton: 是否显示确认按钮
 * timer: 定时器，单位毫秒
 * pos:弹窗追加的位置,默认追加到父窗口的body里。如果是在一层iframe里面使用，需要自定义为window.parent.frames.document.body;两层iframe里面使用，需要自定义为window.parent.parent.frames.document.body,以此类推。
 * confirmCallback：点击确认按钮的回调函数
 */

;
(function($) {
    //使用面向对象思维创建构造函数
    function alertConstructor($ele, options) {
        this.$ele = $ele;
        this.opts = $.extend({},$.fn.trsAlert.defaultOpts, options);
    }

    //通过原型链创建私有函数
    alertConstructor.prototype = {
        createAlert: function() {
        	//注意这里为什么要定义变量_this = this
        	var _this = this;
        	//PS:注意this的使用
            //生成弹窗
            var trsAlertWrap = $("<div></div>").addClass("trs-alert-wrap");
            var trsWindow = $("<div><p class='title'></p><div class='text'></div><div class='btn'><button class='cancel'></button><button class='confirm'></button></div></div>").addClass(this.opts.dftClass);
            var trsWinTit = trsWindow.find(".title").html(this.opts.dftTitle).css({"display":"none"});
            var trsWinText = trsWindow.find(".text").html(this.opts.text);

            //默认标题为空，弹框默认为消息提示框类型
            //如果用户自定义了标题,则弹窗为
            this.opts.dftTitle?trsWinTit.css({"display":"block"}):trsWinTit.css({"display":"none"});

            //判断弹窗类型
            if (this.opts.type == "error") {
                trsWinText.addClass("error").html("失败");
            } else if (this.opts.type == "warning") {
                trsWinText.addClass("warning").html("警告");
            } else if (this.opts.type == "success"){
                trsWinText.addClass("success").html("成功");
            } else{
            	trsWinText.addClass("tip").html("提示信息");
            }

            //判断是否显示取消按钮
            if (this.opts.showCancelButton === true) {
                trsWindow.find(".cancel").html(this.opts.cancelButtonText).on("click", function() {
                    trsAlertWrap.remove();
                });
            } else {
                trsWindow.find(".cancel").hide();
            }

            //判断是否显示确认按钮
            if (this.opts.showConfirmButton === true) {
                trsWindow.find(".confirm").html(this.opts.confirmButtonText).on("click", function(){
                    trsAlertWrap.remove();
                    if(typeof(_this.opts.confirmCallback)=="function"){
                        _this.opts.confirmCallback();
                    }
                    
                });
            } else {
                trsWindow.find(".confirm").hide();
            }

            //自动关闭
            if (this.opts.timer > 0) {
                setTimeout(function() {
                	//console.log(_this);    //指向自定义的构造函数对象
                	//console.log(this);	   //指向window对象,所以要在开头声明var _this = this,才能使用自定义的构造函数对象
                	_this.$ele.removeClass("trs-alert-wrap");
                    trsAlertWrap.remove();
                }, this.opts.timer);
            }

            //考虑iframe嵌套的情况(是该插件里来判断还是自定义参数决定，目前是自定义参数决定)
            trsAlertWrap.append(trsWindow).appendTo($(this.opts.pos));
        },
        // createTips: function(){
        //     alert("tips");
        // }
    };

    //弹窗插件(弹窗和提示框)
    $.fn.trsAlert = function(options) {
    	//实例化对象
    	var trsAlertObj = new alertConstructor(this,options);
     	//调用私有方法
    	trsAlertObj.createAlert();
    	//返回this,保持链式效果不被破坏
    	return this;
    };

    //提示框插件
    // $.fn.trsTips = function(options) {
    //     //实例化对象
    //     var trsTipsObj = new alertConstructor(this,options);
    //     //调用私有方法
    //     trsTipsObj.createTips();
    //     //返回this,保持链式效果不被破坏
    //     return this;
    // };

    //设置默认的参数
    $.fn.trsAlert.defaultOpts = {
        dftTitle: "",
        text: "",
        type: "",
        dftClass: "trs-alert-class",
        cancelButtonText: '关闭',
        confirmButtonText: '确定',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
        pos:"body",
        confirmCallback:function(){}
    };


})(jQuery);

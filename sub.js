$(function() {
   $("p").click(function(){
   		$(this).trsAlert({	
   			type:"success",
   			timer:0,
   			showCancelButton:true,
   			showConfirmButton:true,
   			pos:window.parent.frames.document.body
   		});
   });
});
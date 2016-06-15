$(function() {
   $("div").click(function(){
   		$(this).trsAlert({	
   			type:"success",
   			timer:0,
   			showCancelButton:true,
   			showConfirmButton:true
   		});
   });
});

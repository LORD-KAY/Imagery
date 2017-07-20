/*
 A JQuery Plugin for selecting images similar to image picker 
 This plugin is an open source project hence feel free to tweak it to suite your needs
 But do that at your own risk
*/
(function($){
	$.fn.imagery = function(options){
		//extending the default values to make use
		var settings = $.extend({},$.fn.imagery.defaults,options);

	    //Activating the imagery effect together with its container preview
		var imageName = "";
		$("#image-container").children("img").each(function(){
				$(this).on('click',function(){
					$(".indicator").removeClass("activeness");
					$(this).addClass("activeness");
					imageName = $(this).data("src");
					$("#preview-container").css({"background-image":"url(" + imageName + ")","transition":"all 0.5s ease-in-out"});
				});
		});
		
	};

	//Plugin default values - Added as a property to our plubin function
	$.fn.imagery.defaults = {
		margin:"10px",
		borderRadius:"5px",
		circle:"50%",
		padding:"10px",
		indicator:true,
		onSelectImage:function(){},
	};

}(jQuery));
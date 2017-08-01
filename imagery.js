/*
 A JQuery Plugin for selecting images 
 This plugin is an open source project hence feel free to tweak it to suite your needs
 But do that at your own risk
*/
(function($){
	$.fn.Imagery = function(options){
		"use strict";

		//extending the default values to make use
		var $Imagery = $(this);

		var settings = $.extend(
			{},
			$.fn.Imagery.defaults,
			options);

		//Defining some function bi
		function isDefined(name){
			return typeof name !== "undefined";
		}

		function getSettings(){
			if (isDefined(settings))
			 {
			 	return settings;
			 }
		}

		$Imagery.each(function(){
			//implementing the click functionality for the images
				$Imagery.addClass("indicator");
				$Imagery.on('click',function(){
					//Calling the indicator operation here
					if (settings.indicator && settings.indicator == false) 
					{
						$(".indicator").removeClass("activeness");
						$(this).removeClass("activeness");
					}
					else if (settings.indicator && settings.indicator == true){

						$(".indicator").removeClass("activeness");
						$(this).addClass("activeness");
					}

					settings.imageName = $(this).data("src");
					//This codes will be rewritten
					$("#preview-container").css({"background-image":"url(" + settings.imageName + ")","transition":"all 0.5s ease-in-out"});
					onSelectedImage(this,settings.imageName);
				});

				//Activating the hover function effect
				if (settings.allowHover && settings.allowHover == true)
				 {
				 	//Implementing the hover functionality for the image
					$(this).hover(function(){

						//Implementing the activeness on the hover functionalities
					 	if (settings.indicator && settings.indicator == false)
					 	 {
					 	 	$(".indicator").removeClass("activeness");
					 	 	$(this).removeClass("activeness");
					 	 }
					 	 else if (settings.indicator && settings.indicator == true)
					 	 {
					 	 	$(".indicator").removeClass("activeness");
							$(this).addClass("activeness");
					 	 }
						settings.imageName = $(this).data("src");
						$("#preview-container").css({"background-image":"url(" + settings.imageName + ")","transition":"all 0.5s ease-in-out"});

						onHoverImage(this,settings.imageName);
					});
				 }

				//Activating the callback function of the image has been selected
				function onSelectedImage(e,data){
					if (settings.onSelectedImage && typeof settings.onSelectedImage === "function")
					 {
					 	return settings.onSelectedImage.call(this,data);
					 }
				}

				function onHoverImage(e,data){
					if (settings.onHoverImage && typeof settings.onHoverImage === "function")
					 {
					 	return settings.onHoverImage.call(this,data);
					 }
				}

				function wrapperCss(){
					//wrapping the plugin with a default css
					$Imagery.css({
						"border-radius":"50%",
						"box-sizing":"border-box",
						"margin":"10px",
						"box-shadow":" 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2)",
						"transition":"all 0.5s ease-in-out",
					});
				}

				function wrapperAttrs(){
					//wrapping the plugin with a default attribute
					
				}

				//Defining a function for the custom user css and attributes
				function allowCustomCss(){
					$Imagery.css(settings.wrapperCss);
				}

				function allowCustomAttrs(){
					$Imagery.attr(settings.wrapperAttrs);
				}

				//Calling the defined function for the overall components
				wrapperCss();
				wrapperAttrs();

				//Calling the functions for the custom components
				allowCustomCss();
				allowCustomAttrs();

		});

		return $.extend({},this,{
			"getSettings":getSettings,
		});
	};

	//Plugin default values - Added as a property to our plugin function
	$.fn.Imagery.defaults = {
		wrapperAttrs:{},
		wrapperCss:{},
	    imageName:null,
		indicator:true,
		allowHover:false,
		onSelectedImage:null,
		onHoverImage:null,
	};

}(jQuery));
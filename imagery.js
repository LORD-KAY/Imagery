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

		//Optimization by function creation -- Don't Ask
		function setActive($Indicator,$this){
			return (
		 		$Indicator.removeClass("activeness"),
			 	$($this).addClass("activeness")
		 		);
		}

		function removeActive($Indicator,$this){
		 	return (
		 		$Indicator.removeClass("activeness"),
			 	$($this).removeClass("activeness")
		 		);
		}

		function setOPACITY($OpacityValue,$Indicator,$this){
			var opaqueArray  = [0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];
			switch($OpacityValue)
			{
				case 0.2 || .2:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[0]));
				case 0.3 || .3:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[1]));
				case 0.4 || .4:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[2]));
				case 0.5 || .5:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[3]));
				case 0.6 || .6:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[4]));
				case 0.7 || .7:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[5]));
				case 0.8 || .8:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[6]));
				case 0.9 || .9:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[7]));
				default:
					return ($Indicator.css("opacity",opaqueArray[8]),
												$($this).css("opacity",opaqueArray[8]));
			}
		}

		$.each($Imagery,function(){
			//implementing the click functionality for the images
				$Imagery.addClass("indicator");
				var $Indicator = $(".indicator"),
					$OpacityValue = settings.addOpacity;
					
				$Imagery.on('click',function(){
					//Calling the opacity function for action *_*
					setOPACITY($OpacityValue,$Indicator,this);
					//Calling the indicator operation here
					if (settings.indicator && settings.indicator == false) 
					{
						removeActive($Indicator,this);
					}
					else if (settings.indicator && settings.indicator == true){
						setActive($Indicator,this);
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
						//Calling the opacity function for action *_*
						setOPACITY($OpacityValue,$Indicator,this);
						//Implementing the activeness on the hover functionalities
					 	if (settings.indicator && settings.indicator == false)
					 	 {
					 	 	removeActive($Indicator,this);
					 	 }
					 	 else if (settings.indicator && settings.indicator == true)
					 	 {
					 	 	setActive($Indicator,this);
					 	 }
						settings.imageName = $(this).data("src");
						$("#preview-container").css({"background-image":"url(" + settings.imageName + ")","transition":"all 0.5s ease-in-out"});

						onHoveredImage(this,settings.imageName);
					});
				 }


				//Activating the callback function of the image has been selected
				function onSelectedImage(e,data){
					if (settings.onSelectedImage && typeof settings.onSelectedImage === "function")
					 {
					 	return settings.onSelectedImage.call(this,data);
					 }
				}

				function onHoveredImage(e,data){
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
		addOpacity:1,
		usebase64Img: null,

	};

}(jQuery));
/*
 Library: Imagery - An Image Picker that allows user to select or pick an image
 @author: Acheampong Lord Offei
 @version: v1.0.2
 @github_url: github.com/LORD-KAY/Imagery
 @email_address: offeilord@gmail.com
 @company: Code Alliance - GH
 @description: This Library is simple and lightweight jQuery plugin allowing users or programmers the select image just as picking a color.
 This was motivated as a result of color picker being in existence. What if the developer wants to display a list of images from which the user is
 expected to choose from.

 @LICENSE: This library is under the license of MIT
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
					$OpacityValue = checkOpacity(settings.addOpacity);

				$Imagery.on('click',function(){
					//Calling the opacity function for action *_*
					setOPACITY($OpacityValue,$Indicator,this);
					//Calling the indicator operation here
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

					switch (settings.usebase64Img){
						case true:
							base64ImageData(settings.imageName,function (baseImage) {
								onSelectedImage(this,baseImage);
                            });
							break;
						case false:
							onSelectedImage(this,settings.imageName);
							break;
						default:
							onSelectedImage(this,settings.imageName);
							break;
					}
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
                        switch (settings.usebase64Img){
                            case true:
                                base64ImageData(settings.imageName,function (baseImage) {
                                    onHoveredImage(this,baseImage);
                                });
                                break;
                            case false:
                                onHoveredImage(this,settings.imageName);
                                break;
                            default:
                                onHoveredImage(this,settings.imageName);
                                break;
                        }
					});
				 }
				 //Checking if the custom indicator provided is an object or not
                function isObject(customIndicator){
                    if(typeof customIndicator !== "undefined" && typeof  customIndicator === 'object'){
                        return customIndicator;
                    }
                    else{
                        return "Must Be A CSS Object or Simply An Object { key: value }";
                        //Logger
						console.log("Must Be A CSS Object or Simply An Object { key: value }");
                    }
                }
                //Formatting opacity value
				function checkOpacity($_value){
					var $_value_parser = parseFloat($_value);
					if(isNaN($_value_parser)){
						return "Opacity Value must be an integer or decimal { 0 - 1 Or 0.0 - 0.9 } ";
						//logging the error to the browser console
						console.log("Opacity Value must be an integer or decimal { 0 - 1 Or 0.0 - 0.9 } ");
					}else{
						return $_value_parser;
					}
				}
                //Using the custom Indicator checker function here
                var custom_indicator = isObject(settings.customIndicator);
				//getting the length of the object
                var objectLength = $.map(custom_indicator,function(value,index){
                    return index;
                }).length;

                //Checking to see if the custom indicator object is not empty
                function $_checkerIndicator($_length,$_indicator,$_custom_indicator){
                    if($_length > 0){
                        //Using the simplest path to achieve what i want
                        $_indicator.css($_custom_indicator);
                    }
                    else{
                        return "Custom Indicator Option is Empty. Please Remove it if you won't use it";
                        //Logging the error to the console
						console.log("Custom Indicator Option is Empty. Please Remove it if you won't use it");
                    }
                }

                $_checkerIndicator(objectLength,$Indicator,custom_indicator); //{ length of css, selector, custom colors}
				 //Activating the callback func for the base64 image configs
                function base64ImageData(image_url,callback) {
                    //Performing the converting
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            callback(reader.result);
                        }
                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET',image_url);
                    xhr.responseType = 'blob';
                    xhr.send();
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

				//Using image as an indicator
				var $_indicator_image = isImageString(settings.useImgAsIndicator);
				function isImageString($_url_option){
                	var $_convert_url = $_url_option.toString();
                	if(isNaN($_convert_url) && typeof $_convert_url === "string"){
                		return $_convert_url;
					}
					else {
                		return "Image As Indicator Must Be A String ";
                		console.log("Image As Indicator Must Be A String ");
					}
				}

				function $_imageAsIndicator($_url){
					console.log($_url);
				}
				$_imageAsIndicator($_indicator_image);

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
                    //Calling some fool proof func here
                    var cssWrapper = isObject(settings.wrapperCss);
					$Imagery.css(cssWrapper);
				}

				function allowCustomAttrs(){
                    var attrWrapper = isObject(settings.wrapperAttrs);
					$Imagery.attr(attrWrapper);
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
	    imageName:null, // Do not use this as an usable option i.e not recommended
		indicator:true,
		allowHover:false,
		onSelectedImage:null,
		onHoverImage:null,
		addOpacity:1,
		usebase64Img:false,
        customIndicator:{},//Takes the css effects
		useImgAsIndicator:''
	};

}(jQuery));

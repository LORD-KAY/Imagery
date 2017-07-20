/*
 A JQuery Plugin for selecting images similar to image picker 
 This plugin is an open source project hence feel free to tweak it to suite your needs
 But do that at your own risk
*/
(function($){
	$.fn.imagery = function(options){
		//extending the default values to make use
		var settings = $.extend({},$.fn.imagery.defaults,options);

		//Apply imagery based on the default settings of the page
		return this.css(settings);

	};

	//Plugin default values - Added as a property to our plubin function
	$.fn.imagery.defaults = {
		margin:"10px",
		borderRadius:"5px",
		circle:"50%",
		width:"120px",
		height:"120px",
		backgroundColor:"#123456",
		onSelectImage:function(){},
	};

}(jQuery));
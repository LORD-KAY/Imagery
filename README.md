# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###
This repository is to house Imagery - A simple image plugin that enable users to pick an image just like picking a color out of a
color toolbox
# VERSIONS
- [x] Imagery v1.0.0 <br>
- [x] Imagery v1.0.5

* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###
The set up is very simple
Download or Fork or Clone this repository from either github or bitbucket
Extract the files - imagery.js,index.html,imagery.css, Folder(images- contains the images for testing purpose)

### Including it as a jquery file ###
You can include the extracted files as a jquery library
simple do 

	<link rel="stylesheet" type="text/css" href="imagery.css"/> 
for the css in the doctype header

**For the scripts** 

	<script src="imagery.js" type="text/javascript"></script>
And then you are good to go

### Trying it out ####
Create a div container with and id or a class 
Then include the images inside the div container
Give the images a common id or class name - eg.imagery, pictures etc as a class or ID name NB. For the plugin to work you need to 
do what is above
Get the name of the image the user will click by including data-src . NB this is very important..
USE data-src TO GET THE VALUE OR THE NAME OF THE CLICKED IMAGE

### sample ###
	<div id="image-container">
		<img src="images/image1.jpg" data-src="images/image1.jpg" class="imagery"/>
	</div>
Instantiate the plugin to a jQuery Selector
Either
	
	$("#image-container > img").Imagery();
	
OR

	$("img").Imagery()  
OR

	$(".imagery").Imagery();
### Options

	`{
	   wrapperCss:{},
	   wrapperAttr:{},
	   usebase64Img:boolean (True or False),
	   customIndicator:{},
	   useImgAsIndicator:'', -> Takes string as value
	   onSelectedImage:function(data){
	   },
	   onHoverImage:function(data){
	   },
	   allowHover:boolean (True or False),
	   indicator:boolean (True or False),
	   addOpacity:[0 - 1]
	 }`

There are a lot of options available at codealligh.net/plugins for the plugin
The plugin is also flexible to use .It has the option for the user to write his/her own css by calling the wrapperCss object

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###
Name : Acheampong Lord Offei
Country : Ghana - West Africa
Email: offeilord@gmail.com

### Contact Our Organization ###
Company Name: Code Alliance - GH 
Email : codealligh@gmail.com

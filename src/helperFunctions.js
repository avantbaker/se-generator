import axios from 'axios';
var Qs = require('qs');

export function initParallax() {
	parallaxMasthead();
	parallaxImage();
	parallaxIntro();
}

export function saveFile(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a = null;
    // delete a;
  };
  xhr.open('GET', url);
  xhr.send();
}

export function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){ d += performance.now(); }
    var uuid = 'xxxxxxxx-4xyx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function parallaxMasthead() {
	var mastheadSection= document.querySelector(".masthead-section");
	window.addEventListener("scroll", function() {
		var scrolledHeight = window.pageYOffset,
			limit = mastheadSection.offsetTop+ mastheadSection.offsetHeight;

		if(scrolledHeight > mastheadSection.offsetTop && scrolledHeight <= limit) {
			var heroPos= (scrolledHeight - mastheadSection.offsetTop) /2+ "px";
			var heroOpacity= 1 - (scrolledHeight *0.0065);
			mastheadSection.style.opacity= `${heroOpacity}`;
			mastheadSection.style.transform= `translate3d(0,${heroPos},0)`;
	    	mastheadSection.style.WebkitTransform= `translate3d(0,${heroPos},0)`;
		}
		else {
			mastheadSection.style.opacity= "1";
			mastheadSection.style.transform= "translate3d(0)";
	    	mastheadSection.style.WebkitTransform= "translate3d(0)";
		}

		handleBounce( mastheadSection, scrolledHeight);
	});
}

function parallaxImage() {
	var heroImage= document.querySelector(".hero-image");
	window.addEventListener("scroll", function() {
		var scrolledHeight= window.pageYOffset,
		limit= heroImage.offsetTop+ heroImage.offsetHeight;
		if(scrolledHeight > heroImage.offsetTop && scrolledHeight <= limit) {
			var heroPos= (scrolledHeight - heroImage.offsetTop) /1.5+ "px";
			heroImage.style.transform= `translate3d(0,${heroPos},0)`;
	    	heroImage.style.WebkitTransform= `translate3d(0,${heroPos},0)`;
		} else {
			heroImage.style.transform= "translate3d(0)";
	    	heroImage.style.WebkitTransform= "translate3d(0)";
		}

		handleBounce_sansOpacity( heroImage, scrolledHeight);
	});
}

function parallaxIntro() {
	var heroContent= document.querySelector(".hero-content");
	window.addEventListener("scroll", function() {
		var scrolledHeight= window.pageYOffset,
		limit= heroContent.offsetTop+ heroContent.offsetHeight;

		if(scrolledHeight > heroContent.offsetTop && scrolledHeight <= limit) {
			var heroPos= (scrolledHeight - heroContent.offsetTop) /2+ "px";
			var heroOpacity= 1 - (scrolledHeight *0.0065);
			heroContent.style.opacity= `${heroOpacity}`;
			heroContent.style.transform= `translate3d(0,${heroPos},0)`;
	    	heroContent.style.WebkitTransform= `translate3d(0,${heroPos},0)`;
		}

		handleBounce( heroContent, scrolledHeight );
	});
}


function parallaxContent() {
	var packageBuilder= document.querySelector(".package-builder-container");
	window.addEventListener("scroll", function() {
		var scrolledHeight= window.pageYOffset
		var contentPos= 0 - (scrolledHeight *0.15) + "px";
		packageBuilder.style.transform= `translate3d(0,${contentPos},0)`;
	    packageBuilder.style.WebkitTransform= `translate3d(0,${contentPos},0)`;

	    handleBounce_sansOpacity(packageBuilder, scrolledHeight);
	});
}

function handleBounce(elem, scrollY){
	if( scrollY == 0 ) {
		elem.style.opacity= "1";
		elem.style.transform= "translate3d(0,0,0)";
    	elem.style.WebkitTransform= "translate3d(0,0,0)";
	}
}

function handleBounce_sansOpacity(elem, scrollY){
	if( scrollY == 0 ) {
		elem.style.transform= `translate3d(0,0,0)`;
	    elem.style.WebkitTransform= `translate3d(0,0,0)`;
	}
}

export function readCookie(name) {
    var cookiename = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length,c.length);
    }
    return null;
}

export const getUserData = (cookie) => {
	return axios.post('/marketo/getUser.php',
      Qs.stringify({ marketoCookie: cookie }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    ).then(function(response){
    	console.log(response);
        return response.data;
    });
}

export function getForm(name){
	switch(name){
		case 'Website':
			return 2542;
		case 'Email':
			return 2543;
		case 'Registration':
			return 2544;
		case 'Find':
			return 2545;
		case 'Proposal':
			return 2546;
		default:
			return 2546;
	}
}
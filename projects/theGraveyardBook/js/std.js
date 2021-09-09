/* jshint esversion: 6 */
/* jshint devel: true, unused: false, undef: false */
/* jshint browser: true, node: true,jquery: true */
"use strict";

// JavaScript Document
class STD {
	html2entity(htmlStr) {
		let y = document.createElement('textarea');
		y.innerHTML = htmlStr;
		return y.innerText;
	}

	// take a entiry string and convert to html string
	entity2html(str) {
		let y = document.createElement('textarea');
		y.innerText = str;
		return y.innerHTML;
	}
	
	isEmpty(str) {
		let newStr = str.trim(); // remove whitespaces
		return (newStr.length === 0); // check if length is 0
	}

}
var _std = new STD();

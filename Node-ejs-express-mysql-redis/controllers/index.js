'use strict';

var httpRequest = require('request');  

module.exports = function (router) {
	router.get('/index', function (req, res) {
		var title="Gemini,contact:Gemini-90s@Hotmail.com";
		res.render('index',{title:title});
	});
	router.get('/login', function (req, res) {
		var title="Gemini,contact:Gemini-90s@Hotmail.com";
		res.render('index',{title:title});
	});
};



/*
var express = require('express');
var router = express.Router();
*/

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

exports.index = function(req, res){
  res.render('index', { title: 'Gemini,contact:Gemini-90s@Hotmail.com'});
};
/*exports.index = function(req, res){
  res.redirect("/summer_boy/index.html");
};*/

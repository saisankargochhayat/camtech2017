//require express
var express = require('express');
var path = require('path');

//create our router object
var router = express.Router();

//export our router
module.exports = router;

//route for our home

router.get('/',function(req,res){
	console.log(req.session)
	if(req.session.email){
		res.render('pages/dashboard');
	}
	else{
		res.redirect('/login');
	}
});


router.get('/login',function(req,res){
	res.render('pages/login');
});

router.get('/signup',function(req,res){
	res.render('pages/signup');
});

var express = require('express');
var path = require('path');
var Patient = require('../models/patient');
//create our router object
var router = express.Router();

//export our router
module.exports = router;

router.get('/register',function(req,res){
	res.render('pages/register');
});

router.post('/register',function(req,res){
	console.log(req.body);
	if(!req.body.name){
		res.send("Please send some data");
	}
	console.log("Step 0")
	var new_patient = new Patient({
		name : req.body.name,
		email: req.body.email,
		password: req.body.password,
		gender: req.body.gender,
		contact: req.body.contact,
		college: req.body.college,
		year: req.body.year
	});
	Patient.findOne ({email:new_patient.email},function(err,patient){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			if(patient){
				console.log("Step 1");
				console.log(patient);
				res.send("email aready registered")
			}else{
				new_patient.save(function(err,patient){
					if(err){
						res.send(err);
					}
					else{
						res.send("Patient succesfully saved !");
					}
				});
			}
		}

  	});
 });

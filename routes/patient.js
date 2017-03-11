var express = require('express');
var path = require('path');
var Patient = require('../model/patient');
//create our router object
var router = express.Router();

//export our router
module.exports = router;

router.post('/signup',function(req,res){
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

router.post('/login',function(req,res){
	console.log("got post request");
	//res.send(req.body);
	if(!req.body.email){
		res.send({success:false,message:"enter some data"});
	}else{
		Patient.findOne({email:req.body.email},function(err,patient){
			if(err){
				console.log(err);
				res.send(err);
			}
			if(!patient){
				//res.redirect('/signup');
				res.send({success:false,message:"you are no registered"});
			}
			else{
				if(patient.password == req.body.password){
					console.log("Step1S")
					req.session.email = patient.email;
					res.redirect('/profile');
				}
				else{res.send({success:false,message:"entered wrong password"});}

			}
		});
	};

});

router.get('/logout',function(req,res){
	req.session.destroy();
	res.send("You are now logged out.");
})

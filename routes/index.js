//require express
var express = require('express');
var path = require('path');
var Organisation = require('../models/organisation');
var Patient = require('../models/patient');

//create our router object
var router = express.Router();

//export our router
module.exports = router;

//route for our home

router.get('/',function(req,res){
	if(req.session.email){
		res.redirect('/organisation/dashboard');
	}
	else if(req.session.contact){
		Patient.findOne({contact:req.body.contact},function(err,patient){
			if(err){
				console.log(err);
				res.send(err);
			}
			else {
				if (patient.isUpdated == true) {
					res.redirect('/patient/dashboard');
				}
				else{
					res.redirect('/patient/register');
				}
			}
		});
	}
	else{
		res.render('pages/index');
	}
});

router.post('/signup',function(req,res){
	console.log(req.body);
	if(!req.body){
		res.send("Please send some data");
	}
	console.log("Step 0")
	if (req.body.contact && !req.body.email) {
		var new_patient = new Patient({
			name : req.body.name,
			password: req.body.password,
			contact: req.body.contact
		});
		Patient.findOne ({contact:new_patient.contact},function(err,patient){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				if(patient){
					console.log("Step 1");
					console.log(patient);
					res.send("contact aready registered")
				}else{
					new_patient.save(function(err,patient){
						if(err){
							res.send(err);
						}
						else{
							req.session.contact = organisation.contact;
							res.redirect('/');
						}
					});
				}
			}
		});
	}
	else if (req.body.email && !req.body.contact) {
		var new_organisation = new Organisation({
			name : req.body.name,
			password: req.body.password,
			email: req.body.email
		});
		Organisation.findOne ({email:new_organisation.email},function(err,organisation){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				if(organisation){
					console.log("Step 1");
					console.log(organisation);
					res.send("email aready registered")
				}else{
					new_organisation.save(function(err,organisation){
						if(err){
							res.send(err);
						}
						else{
							req.session.email = organisation.email;
							res.redirect('/');
						}
					});
				}
			}
		});
	}
	else{
		res.send("error");
	}
});

router.post('/login',function(req,res){
 	console.log("got post request");
 	//res.send(req.body);
 	if(!req.body.email && req.body.contact){
 		Patient.findOne({contact:req.body.contact},function(err,patient){
 			if(err){
 				console.log(err);
 				res.send(err);
 			}
 			if(!patient){
 				//res.redirect('/signup');
 				res.send({success:false,message:"you are not registered"});
 			}
 			else{
	 				if(patient.password == req.body.password){
	 					console.log("Step1S")
	 					req.session.contact = patient.contact;
	 					res.redirect('/');
	 				}
	 				else{
						res.send({success:false,message:"entered wrong password"});
					}
 			}
 		});
 	}
	else if(req.body.email && !req.body.contact){
		Organisation.findOne({email:req.body.email},function(err,organisation){
			if(err){
				console.log(err);
				res.send(err);
			}
			if(!organisation){
				//res.redirect('/signup');
				res.send({success:false,message:"you are not registered"});
			}
			else{
					if(organisation.password == req.body.password){
						console.log("Step1S");
						req.session.email = organisation.email;
						res.redirect('/');
					}
					else{
						res.send({success:false,message:"entered wrong password"});
					}
			}
		});
	}
	else{
		res.send("error");
	}
});

router.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect('/');
})

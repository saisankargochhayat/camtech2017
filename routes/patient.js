var express = require('express');
var path = require('path');
var Patient = require('../models/patient');
//create our router object
var router = express.Router();

//export our router
module.exports = router;

router.get('/register',function(req,res){
	res.render('register');
});

router.get('/dashboard',function(req,res){
	res.render('dashboard');
});

router.post('/register',function(req,res){
	console.log(req.body);
	Patient.findOne ({contact:req.session.contact},function(err,patient){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			if(patient.isUpdated == true){
				res.send("Already Updated")
			}else{
				patient.isUpdated = true;
				patient.hospitalno = req.body.hospitalno;
				patient.jsyno = req.body.jsyno;
				patient.occupation = req.body.occupation;
				patient.height = req.body.height;
				patient.weight = req.body.weight;
				patient.bmi = req.body.bmi;
				patient.bloodgroup = req.body.bloodgroup;
				patient.rh = req.body.rh;
				patient.education = req.body.education;
				patient.prevPregnancies = req.body.prevPregnancies;
				patient.liveBirths = req.body.liveBirths;
				patient.existingCond = req.body.existingCond;
				patient.edd = req.body.edd;
				patient.gestationage = req.body.gestationage;
				patient.delivery = req.body.delivery;
				patient.complications = req.body.complications;
				patient.immstatus = req.body.immstatus;
				patient.pasthistory = req.body.pasthistory;
				patient.allergy = req.body.allergy;
				patient.lmp = req.body.lmp;
				patient.save(function(err,patient){
					if(err){
						res.send(err);
					}
					else{
						res.redirect('/');
					}
				});
			}
		}
	});
 });

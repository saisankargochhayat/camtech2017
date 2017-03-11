var express = require('express');
var path = require('path');
var Doctor = require('../model/doctor');
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
	var new_doctor = new Doctor({
		name : req.body.name,
		email: req.body.email,
		password: req.body.password,
		gender: req.body.gender,
		contact: req.body.contact,
		college: req.body.college,
		year: req.body.year
	});
	Doctor.findOne ({email:new_doctor.email},function(err,doctor){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			if(doctor){
				console.log("Step 1");
				console.log(doctor);
				res.send("email aready registered")
			}else{
				new_doctor.save(function(err,doctor){
					if(err){
						res.send(err);
					}
					else{
						res.send("Doctor succesfully saved !");
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
		Doctor.findOne({email:req.body.email},function(err,doctor){
			if(err){
				console.log(err);
				res.send(err);
			}
			if(!doctor){
				//res.redirect('/signup');
				res.send({success:false,message:"you are not registered"});
			}
			else{
				if(doctor.password == req.body.password){
					console.log("Step1S")
					req.session.email = doctor.email;
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

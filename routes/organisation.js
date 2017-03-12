var express = require('express');
var path = require('path');
var Organisation = require('../models/organisation')
var Patient = require('../models/patient');
//create our router object
var router = express.Router();

//export our router
module.exports = router;

function authenticateOrganization(req,res,next){
  if(req.session){
    if(req.session.email){
      next()
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/')
  }
}

function authenticatePatient(req,res,next){
  if(req.session){
    if(req.session.contact){
      next()
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/')
  }
}

router.get('/add_patient',authenticateOrganization,function(req,res,next){
  res.render('org-register');
});

router.get('/dashboard',authenticateOrganization,function(req,res,next){
  Organisation.findOne({email:req.session.email}).populate('patients').exec(function(err,org){
    if(err){
      console.log(err);
      res.send(err)
    }else{
      console.log(org);
      res.render('org-dashboard', {"org": org});
      //Send this data to render the organisation dashboard
    }
  })
});

router.post('/add_patient',authenticateOrganization,function(req,res,next){
  if(!req.body){
    res.send("Please send some data");
  }
  var new_patient = new Patient({
    name : req.body.name,
    password: req.body.password,
    contact: req.body.contact,
    isUpdated: true,
    hospitalno: req.body.hospitalno,
    jsyno: req.body.jsyno,
    occupation: req.body.occupation,
    height: req.body.height,
    weight: req.body.weight,
    bmi: req.body.bmi,
    bloodgroup: req.body.bloodgroup,
    rh: req.body.rh,
    education: req.body.education,
    prevPregnancies: req.body.prevPregnancies,
    liveBirths: req.body.liveBirths,
    existingCond: req.body.existingCond,
    edd: req.body.edd,
    gestationage: req.body.gestationage,
    delivery: req.body.delivery,
    complications: req.body.complications,
    immstatus: req.body.immstatus,
    pasthistory: req.body.pasthistory,
    allergy: req.body.allergy,
    lmp: req.body.lmp
  });
  console.log(new_patient);
  Patient.findOne ({contact:new_patient.contact},function(err,patient){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      if(patient){
        res.send("contact aready registered")
      }else{
        new_patient.save(function(err,patient){
          if(err){
            console.log(err);
            res.send(err);
          }
          else{
            Organisation.update({email:req.session.email},{$push:{patients: new_patient._id}},function(err,org){
                if(err){
                  console.log(err);
                  res.send(err);
                }else{
                  console.log(org);
                  res.send("Done")
                }
            });
          }
        });
      }
    }
  });
});

router.get('/patient/:id',authenticateOrganization,function(req,res,next){
  var id = req.params.id;
  Patient.findById(id,function(err,patient){
    if(err){
      console.log(err);
      res.send(err)
    }else{
      res.render('org-patient',{patient:patient});
    }
  })
});


router.get('/')

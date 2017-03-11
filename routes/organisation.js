var express = require('express');
var path = require('path');
var Organisation = require('../models/organisation');
var mongoose = require('mongoose')
//create our router object
var router = express.Router();
var Organisation = require('../models/organisation');
var Patient = require('../models/patient');
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
  res.render('pages/org-dashboard');
})
router.get('/dashboard',authenticateOrganization,function(req,res,next){
  Organisation.find({email:req.session.email}).populate('patients').exec(function(err,orgs){
    if(err){
      console.log(err);
      res.send(err)
    }else{
      console.log(orgs);
      var render_data = orgs;
      res.send(render_data);
      //Send this data to render the organisation dashboard
    }
  })
})
router.post('/add_patient',authenticateOrganization,function(req,res,next){
  if(req.body.contact && req.body.name){
    var new_patient = new Patient({
			name : req.body.name,
			password: req.body.password,
			contact: req.body.contact
		});
    console.log("Step 1");
    Patient.findOne ({contact:new_patient.contact},function(err,patient){
      if(err){
        console.log(err);
        res.send(err);
      }else{
        console.log("Step 2");
        console.log(patient);
        if(patient){
          res.send("contact aready registered")
        }else{
          new_patient.save(function(err,patient){
            if(err){
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
              })
            }
          });
        }
      }
    });
  }else{
    res.send("Please provide all data");
  }
});

router.get('/',authenticateOrganization,function(req,res,next){
  res.render('baad_me_daalenge');
});
router.get('/patient/:id',authenticateOrganization,function(req,res,next){

});


router.get('/')
//export our router
module.exports = router;

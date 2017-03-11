var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var patientSchema = new Schema({
  name:String,
  email: String,
  password:String,
  gender:String,
  contact:Number,
  college:String,
  year:String
},{ collection:'patients'});

// the schema is useless so far
// we need to create a model using it
var Patient = mongoose.model('Patient', patientSchema);

// make this available to our users in our Node applications
module.exports = Patient;

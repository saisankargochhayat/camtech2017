var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var patientSchema = new Schema({
  name: String,
  age: Number,
  hospitalno: Number,
  jsyno:Number,
  occupation: String,
  height: Number,
  weight: Number,
  bmi:Number,
  bloodgroup: String,
  rh:String,
  education:String,
  prevPregnancies: Number,
  liveBirths:Number,
  existingCond: String,
  edd:Date,
  gestationage:Number,
  delivery:String,
  complications:String,
  immstatus:String,
  pasthistory:String,
  allergy:String,
  lmp: Date,
  contact: String,
  password: String,
  hb:Number,
  urinealbumin:Number,
  usugar:Number,
  hiv:String,
  hbsag:String,
  isUpdated: { type: Boolean, default: false }
},{ collection:'patients'});

// the schema is useless so far
// we need to create a model using it
var Patient = mongoose.model('Patient', patientSchema);

// make this available to our users in our Node applications
module.exports = Patient;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var patientSchema = new Schema({
  name: String,
  age: Number,
  occupation: String,
  height: Number,
  weight: Number,
  bloodgroup: String,
  prevChildren: Number,
  existingCond: String,
  lmp: Date,
  contact: Number,
  password: String,
  isUpdated: { type: Boolean, default: false }
},{ collection:'patients'});

// the schema is useless so far
// we need to create a model using it
var Patient = mongoose.model('Patient', patientSchema);

// make this available to our users in our Node applications
module.exports = Patient;

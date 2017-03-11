var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var doctorSchema = new Schema({
  name:String,
  email: String,
  password:String,
  gender:String,
  contact:Number,
  college:String,
  year:String
},{ collection:'doctors'});

// the schema is useless so far
// we need to create a model using it
var Doctor = mongoose.model('Doctor', doctorSchema);

// make this available to our users in our Node applications
module.exports = Doctor;

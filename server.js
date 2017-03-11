var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session')
mongoose.connect('mongodb://localhost/myapp');
var app = express();
var port = 8080;
var body_parser = require('body-parser');
//route our app
var router = require('./routes/router');
var patient = require('./routes/patient');
var doctor = require('./routes/organisation');

//set static files(css or js or imgs)
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set("views","./views");



app.use(session({
  secret: 'tcshack',
  resave: false,
  saveUninitialized: true
}))


//express middlewire which have access to all our routes
app.use('/',router);
app.use('/patient',patient);
app.use('/organisation',doctor);


//start your server
app.listen(port,function(){
	console.log('app started')
});

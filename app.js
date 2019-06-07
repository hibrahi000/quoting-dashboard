const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const key = require('./config/keys');
const login = require('./routes/login.js');
const user = require('./routes/user.js');
const sessions = require('cookie-session');
const app = express();
const passport = require('passport');
const sgMail = require('@sendgrid/mail');
const flash = require('connect-flash');
const exp = require('./Experimental/testCode1');

mongoose
.connect(key.ABHPHARMA_DB_CONNECT_URI, { useNewUrlParser: true })
.then(() => { console.log('Connected to ABH Pharma DB.....')})
.catch((err) => console.log(err));






// :: view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ___Setting up sessions to be use for login purposes
app.use(
	sessions({
		maxAge: 1000 * 60 * 60 * 2,
		//miliSec    sec     min    hours     days
		keys: [ key.session.cookieKey ]
	})
);

// ___passport middleware
require('./config/passport')(passport);
app.use(passport.initialize('./config/passport.js')); // this initializes
app.use(passport.session());

// ___ user flash
app.use(flash());

// ++ global vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.cred = {
		manager: false,
		admin : false,
		name : 'Base Name'
	};
	next()
});
exp.temp();

	// ___Mounting the route at the / path
	app.use('/', login);
	app.use('/Quoting_App', user);
	
// ++catch 404 and forward to error handler
// !come back to this as it doesnt work properly 

// app.use((req, res, next) => {
// 	next(createError(404));
// });



// !! error handler
// app.use((err, req, res) => {
// 	// ;; set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// ;;render the error page
// 	res.status(err.status || 50);
// 	res.render('error');
// });

// ____Body-Parser for express 4
app.use(bodyParser.urlencoded({ extended: false }));




// ___Sendgrid Mailing Setup
sgMail.setApiKey(key.SENDGRID_API_KEY);

// ! Currently in use for www bin for PORT value
module.exports = app;

















//  _______________________________Section Comment Key
// //Forget
// *
// !
// ?
// TODO
// ++
// --error removed
// :: warning
// ^^ this up here
// ;; This is closing
// TADA Finished

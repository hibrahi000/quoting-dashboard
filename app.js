const createError = require('http-errors');
const logger = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const login = require('./routes/login.js');
const user = require('./routes/user.js');
const sessions = require('cookie-session');
const app = express();
const passport = require('passport');
const sgMail = require('@sendgrid/mail');
const flash = require('connect-flash');
require('dotenv').config();
const key = process.env;

// ** not needed since we open a connection with passport
// mongoose 
// .connect(key.ABHPHARMA_DB_CONNECT_URI, { useNewUrlParser: true })
// .then(() => { console.log('Connected to ABH Pharma DB.....')})
// .catch((err) => console.log(err));
mongoose.set('useFinAndModify', false);





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
		maxAge: 1000 	* 	60	 * 	60 	* 	2,
			   //miliSec    sec     min    hours     days
		keys: [ key.cookieKey ]
	})
);


// ___passport middleware
require('./config/passport')(passport);
app.use(passport.initialize('./config/passport.js')); // this initializes
app.use(passport.session());
console.log(passport.session);

// app.use(express.csrf());
// ^^this express.csrf is used for protection from looking into input values
//We are using the global.loggedUsers to keep track of the users to reference later





// ___ user flash
app.use(flash());


// ++ global vars
app.use((req, res, next) => {
	session = req._passport.session;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next()
});

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

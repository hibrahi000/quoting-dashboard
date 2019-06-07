const jwt = require('jsonwebtoken');
const app_load = require('./user').app_load;
const passport = require('passport');
const key = require('../config/keys');

let message = {
	type: '',
	message: ''
};
exports.login_load = (req, res, next) => {
	res.render('login', { message: message });
};

exports.verify_employee = (req, res, next) => {
	console.log(req.body);
	console.log('SALES Verification Begin...');
	passport.authenticate('salesPass', (errors, staff) => {
		if(errors) {throw errors};
		if (staff === false) {
			req.flash('error_msg','Invalid Credentials');
			res.redirect('/')
		} else {
			req.logIn(staff,(err) => {
				if(err) { return next(err); }
				res.redirect(`/Quoting_App`);
			})
		}
	})(req, res, next);
};

exports.verify_manager = (req, res, next) => {
	console.log('MANAGER Verification Begin...');
	passport.authenticate('managerPass', (errors, staff) => {
		if(errors) {throw errors};
		if (staff === false) {
			req.flash('error_msg','Invalid Credentials');
			res.redirect('/')
		} else {
			req.logIn(staff,(err) => {
				console.log('as');
				res.locals.cred = {
					manager: false,
					admin : false,
					name : `${staff.FirstName} ${staff.LastName}`
				}
				if(err) { return next(err); }
				res.redirect(`/Quoting_App`);
			})
		}
	})(req, res, next);
};

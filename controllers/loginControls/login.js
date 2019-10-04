const jwt = require('jsonwebtoken');
const fs = require('fs');
const app_load = require('../userControls/genUserControls').app_load;
const passport = require('passport');

const key = process.env;

let message = {
	type: '',
	message: ''
};
exports.login_load = (req, res, next) => {
	console.log('Loading Login Page');
	res.render('login', { message: message });
};

exports.verify_employee = (req, res, next) => {
	console.log('SALES Verification Begin...');
	passport.authenticate('salesPass', (errors, staff) => {
		if(errors) {throw errors};
		if (staff === false) {
			console.log('SALES Verification: FAILED');
			req.flash('error_msg','Invalid Credentials');
			res.redirect('/')
		} else {
			req.logIn(staff,(err) => {
				if(err) { return next(err);}
				console.log('SALES Verification: PASSED')
				res.redirect(`/Quoting_App/Dashboard`);
			})
		}
	})(req, res, next);
};

exports.verify_manager = (req, res, next) => {
	console.log('MANAGER Verification Begin...');
	passport.authenticate('managerPass', (errors, staff) => {
		if(errors) {throw errors};
		if (staff === false) {
			console.log('MANAGER Verification: FAILED')
			req.flash('error_msg','Invalid Credentials');
			res.redirect('/')
		} else {
			req.logIn(staff,(err) => {
				console.log('MANAGER Verification: PASSED')
				if(err) { return next(err); }
				res.redirect(`/Quoting_App/Dashboard`);
			})
		}
	})(req, res, next);
};


createEmployee =() => {
	

}
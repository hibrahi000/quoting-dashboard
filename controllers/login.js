const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/keys');

exports.load_page = (req, res, next) => {
	res.render('login', { login: 'Test', password: 'TEST1' });
};

exports.verify_employee = (req, res, next) => {
	console.log('SALES');
	console.log(req.body);
	const { username } = req.body;
	const token = jwt.sign(
		{
			User: username,
			auth: 'SALES'
		},
		key.jwtSecret
	);
	console.log(token);
	passport.authenticate('salesPass', {
		successRedirect: `/Dashboard?tok=${token}`,
		failureRedirect: '/',
		failureFlash: 'Invalid User Name Or Password',
		successFlash: 'Welcome Back! Sales Staff'
	})(req, res, next);
};

exports.verrify_manager = (req, res, next) => {
	console.log('MANAGER');
	console.log(req.body);
	const { username } = req.body;
	const token = jwt.sign(
		{
			User: username,
			auth: 'MANAGER'
		},
		key.jwtSecret
	);
	console.log(token);
	passport.authenticate('managerPass', {
		successRedirect: `/Dashboard?tok=${token}`,
		failureRedirect: '/',
		failureFlash: 'Invalid User Name Or Password',
		successFlash: 'Welcome Back! Manager'
	})(req, res, next);
};

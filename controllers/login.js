const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const employeeDB = require('../models/Employee').Employee;
const errors = [];
const express = require('express');






exports.load_page = (req, res, next) => {
	res.render('login',{login : 'Test', password: 'TEST1'});
};

exports.verify_employee = (req, res, next) => {
	console.log(req.body);
	passport.authenticate('salesPass', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: 'Invalid User Name Or Password',
		successFlash: 'Welcome Back!'
	})(req,res,next);
	
};

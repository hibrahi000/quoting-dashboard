const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const employee = require('../models/Employee').Employee;
const mongoose = require('mongoose');
const key = require('../config/keys');


function passport(passport) {
	console.log('----------------------- START PASSPORT ----------------');
	mongoose
		.connect(key.ABHPHARMA_DB_CONNECT_URI, { useNewUrlParser: true })
		.then(() => {
			console.log('Connected to ABH Pharma DB.....');
		})
		.catch((err) => console.log(err));

	passport.use(
		'salesPass',
		new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
			// ++ Match user
			// console.log(`entering Passport Sales username:  ${username}   password:   ${password}`);

			employee
				.findOne({ Username: username })
				.then((staff) => {
					// console.log(staff)
					// :: if staff is not found
					if (!staff) {
						console.log("Attempt's was made to log into sales Login: " + username);
						return done(null, false);
					}
					// ::If staff is found check for password
					bcrypt.compare(password, staff.Password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							console.log('Staff Verifying ....');
							// ::now we check to see if they are At Manager Tier or sales
							if (staff.Department !== 'SALES' && !staff.Admin) {
								console.log('Not Sales Staff');
								if (!staff.Manager) {
									console.log('Not Manager Either');
									return done(null, false);
								} else {
									// :: if this is one of the sales staff
									console.log('Manager logging into Sales Portal User: ' + username);
									return done(null, staff);
								}
							} else {
								console.log('Sales Staff logging in User: ' + username);
								return done(null, staff);
							}
						} else {
							console.log('error wrong credz');
							return done(null, false);
						}
					});
				})
				.catch((err) => {
					console.log('err');
				});
		})
	);

	passport.use(
		'managerPass',
		new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
			// ++ Match user
			console.log(`entering Passport Manager username:  ${username}   password:   ${password}`);

			employee
				.findOne({ Username: username })
				.then((staff) => {
					// console.log(staff);
					// :: if staff is not found
					if (!staff) {
						console.log("Attempt's was made to log into sales Login: " + username);
						console.log('starting');
						return done(null, false);
					}
					// ::If staff is found check for password
					bcrypt.compare(password, staff.Password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							console.log('Manager Verification ....');
							// ::now we check to see if they are At Manager Tier or Admin
							if (!staff.Manager || !staff.Admin) {
								console.log('Not Manager or Admin');
								return done(null, false);
							} else {
								// :: if this is one of the Manager or Admin staff
								console.log('Manager/Admin logging into Manager Portal User: ' + username);
								
								return done(null, staff);
							}
						} else {
							console.log('Invalid Credentials');
							return done(null, false);
						}
					});
				})
				.catch((err) => {
					console.log('err with searching database');
				});
		})
	);

	passport.serializeUser((employee, done) => {
		console.log('serialized');
		done(null, employee.id);
	});

	passport.deserializeUser((id, done) => {
		employee.findById(id, function(err, user) {
			
			done(err, user);
		});
	});
}

module.exports = passport;

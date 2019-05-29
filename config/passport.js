const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const employee      = require('../models/Employee').Employee;
const mongoose      = require('mongoose');
const key           = require('../config/keys');

function passport(passport) {
	console.log('----------------------- START PASSPORT ----------------');
	mongoose
		.connect(key.ABHPHARMA_DB_CONNECT_URI, { useNewUrlParser: true })
		.then(() =>  console.log('Connected to ABH Pharma DB.....'))
		.catch((err) => console.log(err));

	passport.use(
		'salesPass',
		new LocalStrategy({ passReqToCallback: true }, (username, password, done) => {
			// ++ Match user
			console.log('entering Passport Sales');
			employee
				.findOne({ Username: username })
				.then((staff) => {
					// :: if staff is not found
					if (!staff) {
						console.log("Attempt's was made to log into sales Login: " + username);
						return done(null, false, { message: 'Invalid Username or Password' });
					}
					// ::If staff is found check for password
					bcrypt.compare(password, staff.Password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							console.log('Sales Staff Verified');
							// ::now we check to see if they are At Manager Tier or sales
							if (staff.Department !== SALES) {
								console.log('Not Sales Staff');
								if (!staff.Manager) {
									console.log('Not Manager Either');
									return done(null, false, { message: 'You are not Authorized to use this App' });
								} else {
									// :: if this is one of the sales staff
									console.log('Manager logging in User: ' + username);
									return done(null, staff);
								}
							} else {
								console.log('Sales Staff logging in User: ' + username);
								return done(null, staff);
							}
						}
					});
				})
				.catch((err) => {
					console.log('error');
					return done(null, false, { message: 'wrong login or password' });
				});
		})
	);

	passport.serializeUser((staff, done) => {
		done(null, staff.id);
	});

	passport.deserializeUser((id, done) => {
		employee
			.findById(id, function(err, user) {
				done(err, user);
			})
			.then(() => {
				console.log('user deserialize log out complete');
			})
			.catch((err) => {
				console.log(err);
			});
	});
}

module.exports = passport;

const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const employee      = require('../models/Employee').Employee;
const mongoose      = require('mongoose');
const key           = require('../config/keys');



function passport(passport) {
	console.log('----------------------- START PASSPORT ----------------');
	mongoose
		.connect(key.ABHPHARMA_DB_CONNECT_URI, { useNewUrlParser: true })
		.then(() => { console.log('Connected to ABH Pharma DB.....')})
		.catch((err) => console.log(err));

	passport.use(
		'salesPass',
		new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
			// ++ Match user
			console.log(`entering Passport Sales username:  ${username}   password:   ${password}`);

			employee
				.findOne({ Username: username })
				.then((staff) => {
					console.log(staff)
					// :: if staff is not found
					if (!staff) {
						console.log("Attempt's was made to log into sales Login: " + username);
						return done(null, false, { message: 'Invalid Username or Password' });
					}
					// ::If staff is found check for password
					bcrypt.compare(password, staff.Password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							console.log('Staff Verification ....');
							// ::now we check to see if they are At Manager Tier or sales
							if (staff.Department !== 'SALES' && !staff.Admin ) {
								console.log('Not Sales Staff');
								if (!staff.Manager) {
									console.log('Not Manager Either');
									return done(null, false, { message: 'You are not Authorized to use this App' });
								} else {
									// :: if this is one of the sales staff
									console.log('Manager logging into Sales Portal User: ' + username);
									return done(null, staff);
								}
							} else {
								console.log('Sales Staff logging in User: ' + username);
								return done(null, staff, {message:'Sales Verification Success'});
							}
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
		new LocalStrategy({ passReqToCallback: true}, (username, password, done) => {

		})
	)

	passport.serializeUser((employee, done) => {
		done(null, employee.id);
	});

	passport.deserializeUser((id, done) => {
		employee
			.findById(id, function(err, user) {
				done(err, user);
			});
	});
}




module.exports = passport;

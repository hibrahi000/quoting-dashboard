module.exports = function userAuthenticate(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error_msg', 'Please sign in again');
	res.redirect('/');
};

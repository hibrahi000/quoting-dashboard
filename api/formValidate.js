exports.passwordValidate = (oldPassword,password1, password2) => {
	let result = {
		valid: true,
		msg: 'Update Successful'
	};
    
    if ((password1 === oldPassword)) {
		result.valid = false;
        result.msg = 'Error New Password Cannot Be The Same As The Old One';
    }
	if (!(password1 === password2)) {
		result.valid = false;
		result.msg = 'Error Passwords Do Not Match';
	}
	if (!(password1.length > 6)) {
		result.valid = false;
		result.msg = 'Error Password is less than 6 Characters';
	}
	if (!(password1.indexOf(' ') === -1)) {
		result.valid = false;
		result.msg = 'Error Passwords Should Not Have Any Spaces';
	}
	if (!password1.match(/[A-Z]/)) {
		result.valid = false;
		result.msg = 'Error Passwords Must Contain At Least One Upper Case Letter';
	}
	if (!password1.match(/\d+/g)) {
		result.valid = false;
		result.msg = 'Error Passwords Must Contain At Least One Number';
	}

	return result;
};

exports.originalPasswordVerified = (original, userInput) => {
	console.log('Original Password Verified ' + (original === userInput));
	return original === userInput;
};

exports.passwordChanged = (oldPassword, newPassword, newPasswordRepeat) => {
	return (
		(oldPassword !== ' ' && oldPassword !== '' && oldPassword !== '   ') ||
		(newPassword !== ' ' && newPassword !== '' && newPassword !== '   ') ||
		(newPasswordRepeat !== ' ' && newPasswordRepeat !== '' && newPasswordRepeat !== '   ')
	);
};

exports.emailValidate = (email) => {
	return email.indexOf('@') !== -1 && email.indexOf('.com') !== -1;
};

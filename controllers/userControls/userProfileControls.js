const bcrypt = require('bcryptjs');
const employeeDB = require('../../models/database/Employee').Employee;

const { passwordValidate, passwordChanged, originalPasswordVerified, emailValidate } = require('../../api/formValidate');

let page = 'User Profile';
let message = { type: 'warning', msg: 'hello' };

const setMessage = (type, msg) => {
	message.type = type;
	message.msg = msg;
};

exports.load_user_profile = (req, res, next) => {
	console.log('Loading User Profile');
	res.render('userContent', { user: session.user, page: page, message: message });
};

exports.updateProfilePic = (req, res, next) => {
	let { photo } = req.body;
	let profilePic = {
		data: fs.readFileSync(photo),
		contentType: 'image/png'
	};
	employee
		.findByIdAndUpdate(session.user, { ProfilePic: profilePic })
		.then(() => {
			console.log('Profile Pic Saved');
		})
		.catch((err) => {
			console.trace('Profile Pic couldnt be saved Error' + err);
		});
};

exports.updateUserProfile = (req, res, next) => {
    let { email,newPassword } = req.body;
    let update = {Email:email,};
    console.log(newPassword !== '');
    if(newPassword !== ''){
        bcrypt.genSalt(10, (err, salt) =>
			bcrypt.hash(newPassword, salt, (err, hash) => {
				if (err) throw err;
                update = {...update, Password: hash, PlainPassword: newPassword };
            })
        );
    }else{
        console.log(session.user._id)
        employeeDB.findByIdAndUpdate(session.user._id, update, {new: true}).then(doc => {console.log(doc)})

        res.redirect()
    }
};

exports.validate_UserInfo = (req,res,next) => {
    let originalPassword = session.user.PlainPassword;
    let {email, oldPassword, newPassword , newPasswordRepeat} = req.body;
    let response = {
        type : String,
        msg : String,
        icon : String,
        valid : false,
        email: email,
        newPassword: newPassword,

    }

    if(emailValidate(email)){
        if(passwordChanged(oldPassword,newPassword,newPasswordRepeat)){
            if(originalPasswordVerified(originalPassword, oldPassword)){
                let pass = passwordValidate(oldPassword,newPassword, newPasswordRepeat);
                console.log('original verified');
                if(pass.valid){
                    response.msg = pass.msg;
                    response.type = 'success';
                    response.icon = 'check_circle_outline';
                    response.valid = true;
                    res.send(response);
                }else{
                    response.type = 'danger';
                    response.msg = pass.msg;
                    response.icon = 'error_outline';
                    res.send(response);
                }

            }else{
                response.msg = 'Your old password is not correct'
                response.type = 'danger';
                response.icon = 'error';
                res.send(response);
            }
        }else{
            response.msg = 'Profile updated';
            response.type = 'success';
            response.icon = 'check_circle_outline';
            response.valid = true;
            res.send(response);
        }
    }else{
        response.type = 'danger';
        response.msg = 'The email format is not correct Ex: demo@demo.com';
        response.icon = 'error_outline';
        res.send(response);
    }

}
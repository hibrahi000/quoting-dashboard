console.log('user info script loaded');

ui = {
	validateUpdate: function() {
		$.ajax({
			type: 'POST',
			url: 'Validate_UserInfo_Form',
			dataType: 'json',
			data: {
				email: $('#email').val(),
				oldPassword: $('#oldPassword').val(),
				newPassword: $('#newPassword').val(),
				newPasswordRepeat: $('#newPasswordRepeat').val()
			}
		})
			.done(function(response) {
				//update password in data base using ajax call
				// console.log(response);
                showNotification('top', 'center', response.type, response.msg, response.icon);
                console.log('Response From Server: ' + response.valid);
                if(response.valid){
                updateUserProfile(response);
                }
			})
			.fail((jqXHR, textStatus, err) => {
				console.log('AJAX error response: ', textStatus);
			});
	}
};

const showNotification = function(from, align, type, msg, icon) {
	// type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

	// color = type

	$.notify(
		{
			icon: icon,
			message: msg
		},
		{
			type: type,
			timer: 4000,
			placement: {
				from: from,
				align: align
			}
		}
	);
};

const updateUserProfile = (update) => {
	$.ajax({
		type: 'POST',
		url: 'Update_User_Profile',
		dataType: 'json',
		data: update
	})
		.done(function(response) {
            console.log('User Profile Has Been Updated' + response);
            setTimeout(() => {
                console.log('force reload')
                // location.reload({forcedReload: true});
            },200);
            
		})
		.fail((jqXHR, textStatus, err) => {
			console.log('AJAX error response: ', textStatus);
		});
};
const reset = (array) => {
    
}
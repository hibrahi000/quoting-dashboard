 const employeeDB = require('../../models/database/Employee').Employee;

let cred ={
    name: 'Staff',
    admin: false,
    manager: false
}

    // ++ we had a problem with how to load user info so we are creating middle wear function to do it for every route


exports.refresh = (req,res,next) => {

    console.log('LOADING SESSION')
    // console.log(session);
    employeeDB.findById(session.user._id).then((user) =>{
        session.user = user;
        console.log('Refresh Compleat User Updated');
        console.log(session);
        next();
    })

}

exports.logout = (req,res,next) => {
req.logout()
req.flash('success_msg','Log Out Successful');
res.redirect('/');
}



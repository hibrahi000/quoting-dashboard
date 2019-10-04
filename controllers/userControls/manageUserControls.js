let page = 'Manage Users';


exports.load_Manager_Users = (req,res,next) => {
    res.render('userContent', {user: session.user, page:page});
}


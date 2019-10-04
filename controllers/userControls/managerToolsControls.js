let page = 'Manager Tools';


exports.load_Manager_Tools = (req,res,next) => {
    res.render('userContent', {user: session.user, page:page});
}
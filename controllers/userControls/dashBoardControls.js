let page = 'Dashboard';


exports.load_dashboard = (req,res,next) => {
    // console.log(session.staff);
    console.log('Loading Application');
    res.render('userContent', {user: session.user, page:page});
}
let page = 'My Stats';


exports.load_My_Stats = (req,res,next) => {
    res.render('userContent', {user: session.user, page:page});
}
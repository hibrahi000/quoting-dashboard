let page = 'Message Board';

exports.load_Message_Board = (req,res,next) => {
    res.render('userContent', {user: session.user, page:page});
}
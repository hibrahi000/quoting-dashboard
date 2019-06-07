const jwt = require('jsonwebtoken');
const key = require('../config/keys');




exports.load_page = (req, res, next) => {
    let{tok} =  req.query;
    jwt.verify(tok,key.jwtSecret, (err) => {
        if(err){
            console.log('Query was tampered with')
            res.render('login',{error_msg : 'Verification Error: please sign in again'});
        }
        else{
            let temp = jwt.decode(tok);
            console.log('route achived User Auth: ' + temp.auth);
            res.render('userContent', { User: tok.User, Auth: tok.auth });
        }
})
};


exports.app_load = (req,res,next) => {
    // let token = req.query.token;
    // jwt.verify(token, key.jwtSecret, (err) => {
        // if(err){
        //     req.flash('error_msg');
        //     res.redirect('/');
        // }
        // else{
            // let dTok = jwt.decode(token);
            const {manager, admin, name} = '';
            res.render('userContent', {manager: manager, admin: admin, name :name});
        // }
    // })
}






exports.logout = (req,res,next) => {
req.logout()
req.flash('success_msg','Log Out Successful');
res.redirect('/');
}
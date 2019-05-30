const jwt = require('jsonwebtoken');
const key = require('../config/keys');




exports.load_page = (req, res, next) => {
    let{tok} =  req.query;
    jwt.verify(tok,key.jwtSecret, (err) => {
        if(err){
            console.log(err)
        }
        else{
            console.log('route achived');
            res.render('userContent', { User: tok.User, Auth: tok.auth });
        }
    
})
};
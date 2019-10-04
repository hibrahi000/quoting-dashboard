let page = 'Material List';
const {importMaterialDB} = require('../../middleware/databaseMiddlewear/materialDBControls');

exports.load_Material_List = (req,res,next) => {
    console.log('Loading Material List');
    res.render('userContent', {user: session.user, page:page, MaterialDB: session.MaterialDB});
}



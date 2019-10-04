const materialDB = require('../../models/database/Material').Material;




exports.importMaterialDB = (req,res,next) => {
    materialDB.find({}).then(materialDB => {
        console.log('found materials');
        session = { ...session, MaterialDB: materialDB };
        // console.log(session)
        next();
    })
}


exports.getMaterials = () => {
   


}

exports.getMaterialsByName = (MaterialName) => {
    materialDB.findOne({MaterialName: MaterialName}).then(materialDoc => {
        (req,res,next) => {
            session = {...session, Material: materialDoc};
            next();
        }
    })
}

exports.getMaterialsByCategory = (Category) => {
    materialDB.findOne({CategoryName: Category}).then(categoryDoc => {
        (req,res,next) => {
            session = { ...session, Material: categoryDoc };
            next(categoryDoc)
        }
    })
}
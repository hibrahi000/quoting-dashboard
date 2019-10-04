const mongoose = require('mongoose');

const demo = mongoose.Schema({
    FirstName: {type: String, trim : true},
    LastName: {type: String, trim : true},
});

module.exports =  mongoose.model('Demo', demo);
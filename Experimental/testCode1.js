
const express = require('express');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const key = process.env;


//  ::Routes
// const router = express.Router();
// const loginRoute = require('../routes/login');
// const managerRoute = require('../routes/manager');
// const salesRoute = require('../routes/sales');


//  ::Database
const materialDB = require('../models/database/Material').Material;
const vendorDB = require('../models/database/Vendor').Vendor;
const employeeDB = require('../models/database/Employee').Employee;
const receiptDB = require('../models/database/QuoteReceipts').QuoteReceipt;

//  ::Variables
const errors = [];
const managerView = 'dashboard';
const salesView = 'dashboard';
const loginView = 'dashboard';



mongoose
.connect(key.ABHPHARMA_DB_CONNECT_URI, { useNewUrlParser: true })
.then(() => { console.log('Connected to ABH Pharma DB.....')})
.catch((err) => console.log(err));


// employeeDB.find({}).then(collection => {
//     console.log(collection[3]);
//     let length = 6
//     console.log(length)




// })


// module.exports = {
//     sayHello : ()=> {
//             return 'hello';
//             },
//     addNumbers: (value1, value2) => {
//         return value1 + value2
//     },
//     temp : (req,res) => {
// // const {userCred} = res.locals;
//     // console.log(userCred);
//     }
// }

// userCred = 'hello world';




vendorDB.find({}).then(doc => {
   doc.forEach((doc,index) => {
       console.log(index + ' ' + doc.VendorName);
   })
})
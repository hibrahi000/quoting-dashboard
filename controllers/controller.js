//  _______________________________Section Comment Key
// //Forget
// *
// !
// ?
// TODO
// ++
// --error removed
// :: warning
// ^^ this up here
// ;; This is closing
// TADA Finished

//  __________________________________Comment key End

//  ::Libraries
const express = require('express');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');


//  ::Routes
const router = express.Router();
const loginRoute = require('../routes/login');
const managerRoute = require('../routes/manager');
const salesRoute = require('../routes/sales');


//  ::Database
const materialDB = require('../models/Material').Material;
const vendorDB = require('../models/Vendor').Vendor;
const employeeDB = require('../models/Employee').Employee;
const receiptDB = require('../models/QuoteReceipts').QuoteReceipt;

//  ::Variables
const errors = [];
const managerView = 'dashboard';
const salesView = 'dashboard';
const loginView = 'dashboard';


module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());


  const imports = {
    //* importing express
    app,
    // urlencodedParser,

    //* Security
    bcrypt,
    passport,
    jwt,
    LocalStrategy,

    //* Database Access
    mongoose,
    receiptDB,
    vendorDB,
    materialDB,
    employeeDB,

    //* Mailing Libraries
    sgMail,

    //* Client Side Error responses
    errors,


    //* These are for knowing which partial to load in the respective pages
    managerView,
    salesView,
    loginView,
  };

  //  ::Export all variables to respected routes
  loginRoute(imports);
  // salesRoute(imports);
  // managerRoute(imports);
};

const express = require('express');
const router = express.Router();
const login_load = require('../controllers/login').login_load;
const verify_employee = require('../controllers/login').verify_employee;
const verify_manager = require('../controllers/login').verify_manager;





router.get('/', login_load);

router.post( '/User_Authenticate', verify_employee, );

router.post('/Manager_Authenticate', verify_manager);


module.exports = router;

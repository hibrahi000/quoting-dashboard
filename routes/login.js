const express = require('express');
const router = express.Router();
const login_load = require('../controllers/loginControls/login').login_load;
const verify_employee = require('../controllers/loginControls/login').verify_employee;
const verify_manager = require('../controllers/loginControls/login').verify_manager;
const {getMaterials, getMaterialsByCategory, getMaterialsByName} = require('../middleware/databaseMiddlewear/materialDBControls');




router.get('/', login_load);

router.post( '/User_Authenticate', verify_employee, );

router.post('/Manager_Authenticate', verify_manager);


module.exports = router;

const express = require('express');
const router = express.Router();
const login_page_load = require('../controllers/login').load_page;
const verify_employee = require('../controllers/login').verify_employee;
const verify_manager = require('../controllers/login').verrify_manager;


router.get('/', login_page_load);

router.post('/User_Authenticate', verify_employee );

router.post('/Manager_Authenticate', verify_manager);


module.exports = router;

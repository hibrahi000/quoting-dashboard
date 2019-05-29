const express = require('express');
const router = express.Router();
const login_page_load = require('../controllers/login').load_page;
const verify_employee = require('../controllers/login').verify_employee;

router.get('/', login_page_load);

router.post('/User_Authenticate', verify_employee );

module.exports = router;

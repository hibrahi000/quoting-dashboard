const express = require('express');
const router = express.Router();
const login_page_load = require('../controllers/user').load_page;

router.get('/', login_page_load);

module.exports = router;
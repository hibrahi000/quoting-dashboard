const express = require('express');
const router = express.Router();
const app_load = require('../controllers/user').app_load;
const logout = require('../controllers/user').logout;
const userAuthenticate = require('../middleware/auth')

router.get('/',userAuthenticate, app_load);

router.get('/LogOut', logout)


module.exports = router;
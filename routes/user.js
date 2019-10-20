// ++ Library Imports
const express = require('express');
const router = express.Router();

// ++ Controllers for each of the routes
const { load_dashboard } = require('../controllers/userControls/dashBoardControls');
const {
	load_user_profile,
	updateUserProfile,
	validate_UserInfo
} = require('../controllers/userControls/userProfileControls');
const { load_Material_List } = require('../controllers/userControls/materialListControls');
const { load_My_Stats } = require('../controllers/userControls/myStatsControls');
const { load_Message_Board } = require('../controllers/userControls/messageBoardControls');
const { load_Manager_Users } = require('../controllers/userControls/manageUserControls');
const { load_Manager_Tools } = require('../controllers/userControls/managerToolsControls');

// ++ General Controller that each of the routs can use
const { loadUser, refresh, logout } = require('../controllers/userControls/genUserControls');

// ++ Useful Middle Wear that can be used by each of the routes
const {
	getMaterialsByName,
	getMaterialsByCategory,
	getMaterials,
	importMaterialDB
} = require('../middleware/databaseMiddlewear/materialDBControls');
const { storeUserBySession } = require('../middleware/databaseMiddlewear/employeeDBControls');

// ++ Authentication for all routes
const { userAuthenticate } = require('../middleware/auth');

// ^^ ROUTES For /Quoting_App/** Whatever the req URl is */

router.get('/Dashboard', userAuthenticate, refresh, load_dashboard);

router.get('/User_Profile', userAuthenticate, refresh, load_user_profile);
router.post('/Validate_UserInfo_Form', userAuthenticate, validate_UserInfo);
router.post('/Update_User_Profile', userAuthenticate, updateUserProfile);

router.get('/Material_List', userAuthenticate, refresh, importMaterialDB, load_Material_List);

router.get('/My_Stats', userAuthenticate, refresh, load_My_Stats);

router.get('/Message_Board', userAuthenticate, refresh, load_Message_Board);

router.get('/Manage_Users', userAuthenticate, refresh, load_Manager_Users);

router.get('/Manager_Tools', userAuthenticate, refresh, load_Manager_Tools);

router.get('/LogOut', userAuthenticate, logout);

module.exports = router;

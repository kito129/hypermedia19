//import dependencies
const express = require("express");
const router = express.Router();
//import controller
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

// Handle incoming requests to /user
router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, UserController.user_delete);

//export modules
module.exports = router;

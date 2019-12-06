//import dependencies
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
//import controller
const SeminarsController = require('../controllers/seminars');

// Handle incoming requests to /seminars
router.get("/",  SeminarsController.events_get_all);

router.post("/", checkAuth, SeminarsController.events_create_event);

router.get("/:eventId",  SeminarsController.events_get_event);

router.delete("/:eventId", checkAuth, SeminarsController.events_delete_event);

//import modules
module.exports = router;

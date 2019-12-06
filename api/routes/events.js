//import dependencies
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
//import controller
const EventsController = require('../controllers/events');

// Handle incoming requests to /events
router.get("/", EventsController.events_get_all);

router.post("/", checkAuth, EventsController.events_create_event);

router.get("/:eventId", EventsController.events_get_event);

router.delete("/:eventId", checkAuth, EventsController.events_delete_event);

//export module
module.exports = router;

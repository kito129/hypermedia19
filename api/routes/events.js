const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const EventsController = require('../controllers/events');

// Handle incoming GET requests to /events
router.get("/", checkAuth, EventsController.events_get_all);

router.post("/", checkAuth, EventsController.events_create_event);

router.get("/:eventId", checkAuth, EventsController.events_get_event);

router.delete("/:eventId", checkAuth, EventsController.events_delete_event);

module.exports = router;

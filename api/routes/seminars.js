const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SeminarsController = require('../controllers/seminars');

// Handle incoming GET requests to /events
router.get("/", checkAuth, SeminarsController.events_get_all);

router.post("/", checkAuth, SeminarsController.events_create_event);

router.get("/:eventId", checkAuth, SeminarsController.events_get_event);

router.delete("/:eventId", checkAuth, SeminarsController.events_delete_event);

module.exports = router;

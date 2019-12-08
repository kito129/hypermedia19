const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SeminarsController = require('../controllers/seminars');

// Handle incoming GET requests to /seminars
router.get("/", SeminarsController.seminars_get_all);

router.post("/", checkAuth, SeminarsController.seminars_create_seminar);

router.get("/:seminarId", SeminarsController.seminars_get_seminar);

router.delete("/:seminarId", checkAuth, SeminarsController.seminars_delete_seminar);

module.exports = router;

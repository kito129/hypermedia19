const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SeminarsController = require('../controllers/seminars');

// Handle incoming GET requests to /seminars
router.get("/", SeminarsController.seminars_get_all);

router.post("/", checkAuth, SeminarsController.seminars_create_order);

router.get("/:orderId", SeminarsController.seminars_get_order);

router.delete("/:orderId", checkAuth, SeminarsController.seminars_delete_order);

module.exports = router;

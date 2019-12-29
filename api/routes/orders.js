const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming requests to /order
router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth, OrdersController.orders_create_order);

router.get("/:userId", checkAuth, OrdersController.orders_get_order);

router.get("/:userId/:eventId", checkAuth, OrdersController.orders_get_order_get_event);

router.patch("/:userId/:update", checkAuth, OrdersController.orders_update_order);

router.delete("/:userId", checkAuth, OrdersController.orders_delete);

module.exports = router;

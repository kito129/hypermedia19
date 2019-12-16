const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming requests to /order
router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth, OrdersController.orders_create_order);

router.get("/:orderId", checkAuth, OrdersController.orders_get_order);

router.patch("/:orderId", checkAuth, OrdersController.orders_update_order);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete);

module.exports = router;

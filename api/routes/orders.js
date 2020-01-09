const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming requests to /order

router.post("/:userId", checkAuth, OrdersController.orders_create_order);//

router.get("/:userId", checkAuth, OrdersController.orders_get_order);//

router.get("/single/:singleId", checkAuth, OrdersController.orders_get_order_single);//

router.get("/:userId/:eventId", checkAuth, OrdersController.orders_get_order_get_event);//

router.delete("/:userId", checkAuth, OrdersController.orders_delete);//

module.exports = router;

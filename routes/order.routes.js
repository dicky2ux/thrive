const router = require("express").Router();
const { verifyToken } = require("../misc/auth");
const orderController = require("../controllers/orders.controllers");

router.post("/", verifyToken, orderController.createOrder);
router.get("/my", verifyToken, orderController.getMyOrders);

module.exports = router;

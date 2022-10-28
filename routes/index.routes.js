const express = require("express");
const router = express.Router();
const userRoutes = require("./users.routes");
const productRoutes = require("./products.routes");
const orderRoutes = require("./order.routes");

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);

module.exports = router;

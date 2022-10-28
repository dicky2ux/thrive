const router = require("express").Router();
const { verifyToken } = require("../misc/auth");
const productController = require("../controllers/products.controllers");

router.get("/", verifyToken, productController.getAllProducts);
router.get("/my", verifyToken, productController.getMyProducts);
router.get("/:id", verifyToken, productController.getOneProduct);
router.post("/", verifyToken, productController.createProduct);

module.exports = router;

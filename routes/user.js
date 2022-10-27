const express = require("express");
const { authentication } = require("../middleware/authentication");
const router = express.Router();
const userController = require("../handler/user");

router.post("/register", userController.register);

module.exports = router;

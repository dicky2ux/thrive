const router = require("express").Router();
const userController = require("../controllers/users.controllers");
const { register, login } = require("../validation/user.validation");

//User login & register
router.post("/register", register(), userController.register);
router.post("/login", login(), userController.login);

module.exports = router;

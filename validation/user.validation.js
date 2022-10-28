const { body, check } = require("express-validator");

module.exports = {
  register: () => [
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
    check("email").isEmail().withMessage("Not an email"),
  ],
  login: () => [
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
    check("email").isEmail().withMessage("Not an email"),
  ],
};

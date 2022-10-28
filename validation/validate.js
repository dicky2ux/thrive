const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.errors.map((eachError) => eachError.msg);
    return res
      .status(400)
      .json({ code: 400, status: "Failed", message: errorMessages[0] });
  }
  next();
};

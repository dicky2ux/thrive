const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ClientError = require("../../exceptions/ClientError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../../exceptions/resHandler");
const notFoundError = require("../../exceptions/notFoundError");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new notFoundError("User not found", 404);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ClientError("Invalid password", 400);
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    resSuccessHandler(res, { token }, "Login successful", 200);
  } catch (error) {
    resErrorHandler(res, error);
  }
};

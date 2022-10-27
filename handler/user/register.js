const { User } = require("../models");
const ClientError = require("../../exceptions/ClientError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../../exceptions/resHandler");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOrCreate({
      where: { email },
      defaults: { password },
    });
    if (!user) {
      throw new ClientError("Email already exists", 400);
    }
    resSuccessHandler(res, 201, "User created successfully");
  } catch (error) {
    resErrorHandler(res, error);
  }
};

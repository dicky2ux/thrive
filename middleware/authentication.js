require;
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const AuthenticationError = require("../exceptions/AuthenticationError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../../exceptions/resHandler");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthenticationError("Authentication failed");
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      throw new AuthenticationError("Authentication failed");
    }
    req.user = user;
    next();
  } catch (error) {
    resErrorHandler(res, error);
  }
};

const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const NotFoundError = require("../exceptions/NotFoundError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const ClientError = require("../exceptions/ClientError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../exceptions/resHandler");

const userController = {
  login: async (req, res) => {
    // #swagger.tags = ['User']
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new NotFoundError("User not found", 404);
      }
      const isPasswordMatch = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatch) {
        throw new AuthenticationError("Wrong password", 401);
      }
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(payload, JWT_SECRET);
      resSuccessHandler(res, { token }, "Login Success", 200);
    } catch (error) {
      resErrorHandler(res, error);
    }
  },

  register: async (req, res) => {
    // #swagger.tags = ['User']
    const { email, password, name } = req.body;
    const foundUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (foundUser) {
      throw new ClientError("Email already registered", 400);
    } else {
      const newUser = await User.create({
        email: email,
        password: password,
        name: name,
      });
      resSuccessHandler(res, newUser, "User created", 201);
    }
  },
};

module.exports = userController;

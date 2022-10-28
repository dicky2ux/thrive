const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Op } = require("sequelize");
const { Transaction, Product, Category } = require("../models");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed",
          message: "Kamu Harus Login Terlebih Dahulu",
        });
      req.user = user; //THISSSSSS
      next();
    });
  } else {
    return res.status(400).json({
      code: 400,
      status: "Failed",
      message: "You Are Not Authenticated",
    });
  }
};

const verifyTokenProductBuyer = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed",
          message: "Token is not valid!",
        });
      req.user = user; //THISSSSSS
      next();
    });
  } else {
    try {
      const { name, category_id } = req.query;
      let options = {
        where: {
          is_publish: true,
          sold: false,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_publish"],
        },
        include: {
          model: Category,
          attributes: ["category"],
        },
        order: [["name", "ASC"]],
      };
      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }

      if (category_id) {
        options.where.category_id = category_id;
      }
      const AllProduct = await Product.findAll(options);
      // if (AllProduct.length <= 0) {
      //   return res.status(404).json({
      //     code: 404,
      //     status: "Failed",
      //     message: "Product Not Found",
      //   });
      // }
      return res.status(201).json({
        code: 201,
        status: "Sucess",
        result: AllProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(503).json({
        code: 503,
        status: "Error",
        message: "System Error",
      });
    }
  }
};

module.exports = {
  verifyToken,
  verifyTokenProductBuyer,
};

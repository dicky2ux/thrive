const { User, Product } = require("../models");
const { Op } = require("sequelize");
const NotFoundError = require("../exceptions/NotFoundError");
const ClientError = require("../exceptions/ClientError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../exceptions/resHandler");

const productController = {
  // GET ALL PRODUCTS
  getAllProducts: async (req, res) => {
    // #swagger.tags = ['Product']
    /* #swagger.security = [{
    //   "Bearer": []
     }] */
    try {
      const { id } = req.user;
      const { name, price } = req.query;
      let options = {
        where: {
          user_id: {
            [Op.not]: id,
          },
          stock: {
            [Op.gt]: 0,
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "user_id"],
        },
        order: [["name", "ASC"]],
      };
      if (!name && !price) {
        const products = await Product.findAll(options);
        if (!products) {
          throw new NotFoundError("Product not found", 404);
        }
        resSuccessHandler(res, products, "Get all products success", 200);
      } else if (name && !price) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
        const products = await Product.findAll(options);
        if (!products) {
          throw new NotFoundError("Product not found", 404);
        }
        resSuccessHandler(res, products, "Get all products success", 200);
      } else if (!name && price) {
        if (price === "low") {
          options.order = [["price", "ASC"]];
          const products = await Product.findAll(options);
          if (!products) {
            throw new NotFoundError("Product not found", 404);
          }
          resSuccessHandler(res, products, "Get all products success", 200);
        } else if (price === "high") {
          options.order = [["price", "DESC"]];
          const products = await Product.findAll(options);
          if (!products) {
            throw new NotFoundError("Product not found", 404);
          }
          resSuccessHandler(res, products, "Get all products success", 200);
        }
      } else if (name && price) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
        if (price === "low") {
          options.order = [["price", "ASC"]];
          const products = await Product.findAll(options);
          if (!products) {
            throw new NotFoundError("Product not found", 404);
          }
          resSuccessHandler(res, products, "Get all products success", 200);
        } else if (price === "high") {
          options.order = [["price", "DESC"]];
          const products = await Product.findAll(options);
          if (!products) {
            throw new NotFoundError("Product not found", 404);
          }
          resSuccessHandler(res, products, "Get all products success", 200);
        }
      }
    } catch (error) {
      resErrorHandler(res, error);
    }
  },

  // GET MY OWN PRODUCTS
  getMyProducts: async (req, res) => {
    // #swagger.tags = ['Product']
    /* #swagger.security = [{
    //   "Bearer": []
     }] */
    const { id } = req.user;
    const products = await Product.findAll({
      where: {
        user_id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    if (!products) {
      throw new NotFoundError("Product not found", 404);
    }
    resSuccessHandler(res, products, "Get all my products success", 200);
  },

  // GET ONE PRODUCT
  getOneProduct: async (req, res) => {
    // #swagger.tags = ['Product']
    /* #swagger.security = [{
    //   "Bearer": []
     }] */
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    if (!product) {
      throw new NotFoundError("Product not found", 404);
    }
    resSuccessHandler(res, product, "Get one product success", 200);
  },

  // CREATE PRODUCT
  createProduct: async (req, res) => {
    // #swagger.tags = ['Product']
    /* #swagger.security = [{
    //   "Bearer": []
     }] */
    const { id } = req.user;
    const { name, price, stock } = req.body;
    const product = await Product.create({
      name,
      price,
      stock,
      user_id: id,
    });
    if (!product) {
      throw new ClientError("Failed to create product", 400);
    }
    resSuccessHandler(res, product, "Create product success", 201);
  },
};

module.exports = productController;

const ClientError = require("../../exceptions/ClientError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../../exceptions/resHandler");
const { Product } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.create({ name, price, stock });
    if (!product) {
      throw new ClientError("Product already exists", 400);
    }
    resSuccessHandler(res, 201, "Product created successfully");
  } catch (error) {
    resErrorHandler(res, error);
  }
};

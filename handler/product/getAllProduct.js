const NotFoundError = require("../../exceptions/NotFoundError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../../exceptions/resHandler");
const { User, Product, Op } = require("../../models");

// module.exports get All Product without my product where stock is greater than 0
module.exports = async (req, res) => {
  try {
    const { id } = req.user;
    const { search } = req.query;
    const products = await Product.findAll({
      where: {
        user_id: { [Op.ne]: id },
        stock: { [Op.gt]: 0 },
        product_name: {
          [Op.like]: `%${search}%`,
        },
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    if (!products) {
      throw new NotFoundError("Product not found", 404);
    }
    resSuccessHandler(res, products, "Success get all product", 200);
  } catch (error) {
    resErrorHandler(res, error);
  }
};

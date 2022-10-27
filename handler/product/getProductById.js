const NotFoundError = require("../../exceptions/NotFoundError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../../exceptions/resHandler");
const { User, Product, Op } = require("../../models");

// module.exports get Product By Id send product is sold out if stock is 0
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
        stock: { [Op.gt]: 0 },
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
    if (!product) {
      throw new NotFoundError("Product not found", 404);
    }
    resSuccessHandler(res, product, "Success get product by id", 200);
  } catch (error) {
    resErrorHandler(res, error);
  }
};

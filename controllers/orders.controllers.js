const { User, Product, Order, sequelize } = require("../models");
const { sendMail } = require("../handler/mailjet");
const NotFoundError = require("../exceptions/NotFoundError");
const ClientError = require("../exceptions/ClientError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../exceptions/resHandler");

const orderController = {
  // Create Order impact on Product Stock, and send email to User, and product owner
  createOrder: async (req, res) => {
    // #swagger.tags = ['Orders']
    /* #swagger.security = [{
    //   "Bearer": []
     }] */
    try {
      const { id } = req.user;
      const { product_id, quantity } = req.body;
      const product = await Product.findOne({
        where: {
          id: product_id,
        },
      });
      if (!product) {
        throw new NotFoundError("Product not found", 404);
      }
      if (product.stock < quantity) {
        throw new ClientError("Stock not enough", 400);
      }
      const total_price = product.price * quantity;
      const order = await Order.create({
        user_id: id,
        product_id,
        quantity,
        total_price,
      });
      if (!order) {
        throw new ClientError("Order failed", 400);
      }
      const updatedStock = product.stock - quantity;
      const updateStock = await Product.update(
        {
          stock: updatedStock,
        },
        {
          where: {
            id: product_id,
          },
        }
      );
      if (!updateStock) {
        throw new ClientError("Update stock failed", 400);
      }
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundError("User not found", 404);
      }
      const productOwner = await User.findOne({
        where: {
          id: product.user_id,
        },
      });
      if (!productOwner) {
        throw new NotFoundError("Product Owner not found", 404);
      }
      const subject = `Thanks for buying in Thrive. Your order is on the way!`;
      const message = `Thanks for buying ${product.name} from ${productOwner.name} with total price Rp.${total_price} and quantity ${quantity}`;
      const html = `<h1>More Closer with me in LinkedIn <a href="https://www.linkedin.com/in/dickyadhisatria/">Dicky Adhi Satria</a></h1>`;
      await sendMail(user.email, user.name, subject, message, html);
      return resSuccessHandler(res, order, "Order Success", 201);
    } catch (error) {
      resErrorHandler(res, error);
    }
  },

  // Get all my orders
  getMyOrders: async (req, res) => {
    // #swagger.tags = ['Orders']
    /* #swagger.security = [{
    //   "Bearer": []
     }] */
    try {
      const { id } = req.user;
      const orders = await Order.findAll({
        where: {
          user_id: id,
        },
        include: [
          {
            model: Product,
          },
        ],
      });
      if (!orders) {
        throw new NotFoundError("Orders not found", 404);
      }
      return resSuccessHandler(res, orders, "Get all my orders", 200);
    } catch (error) {
      resErrorHandler(res, error);
    }
  },
};

module.exports = orderController;

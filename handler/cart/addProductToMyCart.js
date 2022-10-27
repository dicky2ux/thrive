const ClientError = require("../../exceptions/ClientError");
const {
  resSuccessHandler,
  resErrorHandler,
} = require("../../exceptions/resHandler");
const { Product, Cart } = require("../../models");

// module.exports add Product to My Cart, if cart does not exist create new cart, if product already in cart update quantity, if product not in cart create new cart item, if product stock is 0 send product is sold out, if product stock is less than quantity send product stock is not enough

module.exports = async (req, res) => {
  try {
    const { id } = req.user;
    const { product_id } = req.params;
    const { quantity } = req.body;
    const product = await Product.findOne({
      where: {
        id: product_id,
      },
    });
    if (!product) {
      throw new ClientError("Product not found", 404);
    }
    if (product.stock === 0) {
      throw new ClientError("Product is sold out", 400);
    }
    if (product.stock < quantity) {
      throw new ClientError("Product stock is not enough", 400);
    }
    const cart = await Cart.findOne({
      where: {
        user_id: id,
      },
    });
    if (!cart) {
      const newCart = await Cart.create({
        user_id: id,
      });
      const newCartItem = await newCart.createCartItem({
        product_id,
        quantity,
      });
      resSuccessHandler(
        res,
        newCartItem,
        "Success add product to my cart",
        201
      );
    } else {
      const cartItem = await cart.getCartItems({
        where: {
          product_id,
        },
      });
      if (cartItem.length === 0) {
        const newCartItem = await cart.createCartItem({
          product_id,
          quantity,
        });
        resSuccessHandler(
          res,
          newCartItem,
          "Success add product to my cart",
          201
        );
      } else {
        const newQuantity = cartItem[0].quantity + quantity;
        if (product.stock < newQuantity) {
          throw new ClientError("Product stock is not enough", 400);
        }
        const updateCartItem = await cartItem[0].update({
          quantity: newQuantity,
        });
        resSuccessHandler(
          res,
          updateCartItem,
          "Success add product to my cart",
          201
        );
      }
    }
  } catch (error) {
    resErrorHandler(res, error);
  }
};

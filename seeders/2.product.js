"use strict";
const product = require("../masterdata/product.json");
const productDataMapped = product.map((eachProduct) => {
  eachProduct.createdAt = new Date();
  eachProduct.updatedAt = new Date();
  return eachProduct;
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", productDataMapped, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};

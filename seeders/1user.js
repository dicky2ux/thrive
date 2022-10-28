"use strict";

const usersData = require("../masterdata/user.json");
const bcrypt = require("bcrypt");

const usersDataMapped = usersData.map((eachUserData) => {
  eachUserData.password = bcrypt.hashSync(
    eachUserData.password,
    +process.env.SALT_ROUNDS
  );
  eachUserData.createdAt = new Date();
  eachUserData.updatedAt = new Date();
  return eachUserData;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", usersDataMapped, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};

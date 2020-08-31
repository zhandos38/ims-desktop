"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "cashbox",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        balance: {
          type: Sequelize.DECIMAL
        },
        created_at: {
          type: Sequelize.INTEGER
        },
        updated_at: {
          type: Sequelize.INTEGER
        }
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cashbox");
  }
};

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("order_items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Product"
          },
          key: "id"
        }
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Order"
          },
          key: "id"
        }
      },
      name: {
        type: Sequelize.STRING
      },
      barcode: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      price: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.TINYINT
      },
      created_at: {
        type: Sequelize.INTEGER
      },
      updated_at: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("order_items");
  }
};

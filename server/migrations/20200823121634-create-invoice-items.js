'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoice_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "invoice"
          },
          key: "id"
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "product"
          },
          key: "id"
        }
      },
      barcode: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      price_in: {
        type: Sequelize.DECIMAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoice_items');
  }
};
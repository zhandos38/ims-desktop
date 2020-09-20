'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "category"
          },
          key: "id"
        }
      },
      price_in: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      price_retail: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      price_wholesale: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      percentage_rate: {
        type: Sequelize.TINYINT
      },
      wholesale_value: {
        type: Sequelize.TINYINT
      },
      unit: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.TINYINT
      },
      piece_quantity: {
        type: Sequelize.TINYINT
      },
      piece_price: {
        type: Sequelize.TINYINT
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
    await queryInterface.dropTable('product');
  }
};
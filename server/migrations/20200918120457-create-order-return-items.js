'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_return_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_return_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'order_return'
          },
          key: 'id'
        }
      },
      order_items_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'order_items'
          },
          key: 'id'
        }
      },
      product_name: {
        type: Sequelize.STRING
      },
      shift_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'shift'
          },
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      price: {
        type: Sequelize.DECIMAL
      },
      created_at: {
        type: Sequelize.INTEGER
      }
    }, {
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_return_items');
  }
};
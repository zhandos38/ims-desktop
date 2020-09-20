'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer_debt_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "customer"
          },
          key: "id"
        }
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "order"
          },
          key: "id"
        }
      },
      staff_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "user"
          },
          key: "id"
        }
      },
      shift_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "shift"
          },
          key: "id"
        }
      },
      sum: {
        type: Sequelize.DECIMAL
      },
      created_at: {
        type: Sequelize.INTEGER
      },
      updated_at: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customer_debt_history');
  }
};
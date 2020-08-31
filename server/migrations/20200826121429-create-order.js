"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "user"
          }
        }
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "customer"
          }
        }
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      amount_discount: {
        type: Sequelize.DECIMAL
      },
      cost_total: {
        type: Sequelize.DECIMAL
      },
      amount_card: {
        type: Sequelize.DECIMAL
      },
      amount_cash: {
        type: Sequelize.DECIMAL
      },
      pay_method: {
        type: Sequelize.TINYINT(3)
      },
      pay_status: {
        type: Sequelize.TINYINT(3)
      },
      status: {
        type: Sequelize.TINYINT(2)
      },
      is_debt: {
        type: Sequelize.BOOLEAN
      },
      amount_debt: {
        type: Sequelize.DECIMAL
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
      comment: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable("order");
  }
};

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shift", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "User"
          },
          key: "id"
        }
      },
      cashbox_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Cashbox"
          },
          key: "id"
        }
      },
      sum_at_open: {
        type: Sequelize.DECIMAL
      },
      sum_at_close: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      opened_at: {
        type: Sequelize.INTEGER
      },
      closed_at: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Shift");
  }
};

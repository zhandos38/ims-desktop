"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("shift", {
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
            tableName: "user"
          },
          key: "id"
        }
      },
      cashbox_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "cashbox"
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
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    await queryInterface.dropTable("shift");
  }
};

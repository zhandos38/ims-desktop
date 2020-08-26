"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("invoice", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number_in: {
        type: Sequelize.STRING
      },
      is_debt: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.TINYINT
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "supplier"
          },
          key: "id"
        }
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      created_at: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("invoice");
  }
};

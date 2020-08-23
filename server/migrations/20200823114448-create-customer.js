'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      birthday_date: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      debt_sum: {
        type: Sequelize.DECIMAL
      },
      sale_sum: {
        type: Sequelize.DECIMAL
      },
      created_at: {
        type: Sequelize.INTEGER,
      },
      updated_at: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customer');
  }
};
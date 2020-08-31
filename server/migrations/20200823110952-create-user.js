'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      cashbox_id: {
        type: Sequelize.INTEGER,
        preferences: {
          model: {
            tableName: "cashbox"
          },
          key: "id"
        }
      },
      role: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('user');
  }
};
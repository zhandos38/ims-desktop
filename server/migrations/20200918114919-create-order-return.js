'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_return', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'order',
          },
          key: 'id'
        }
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_return');
  }
};
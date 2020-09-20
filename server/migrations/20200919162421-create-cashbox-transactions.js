'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cashbox_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cashbox_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'cashbox'
          },
          key: 'id'
        }
      },
      type: {
        type: Sequelize.TINYINT(2),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'user'
          },
          key: 'id'
        }
      },
      comment: {
        type: Sequelize.TEXT
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
      method: {
        type: Sequelize.TINYINT(2),
        defaultValue: 0
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
    await queryInterface.dropTable('cashbox_transactions');
  }
};
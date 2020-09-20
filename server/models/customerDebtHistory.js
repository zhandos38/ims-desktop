'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerDebtHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerDebtHistory.belongsTo(models.Customer, {
          foreignKey: {
            name: 'customer_id'
          }
      });

      CustomerDebtHistory.belongsTo(models.Order, {
          foreignKey: {
            name: 'order_id'
          }
      });

      CustomerDebtHistory.belongsTo(models.User, {
          foreignKey: {
            name: 'staff_id'
          }
      });

      CustomerDebtHistory.belongsTo(models.Shift, {
          foreignKey: {
            name: 'shift_id'
          }
      });
    }
  };
  CustomerDebtHistory.init({
    customer_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    shift_id: DataTypes.INTEGER,
    sum: DataTypes.DECIMAL,
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CustomerDebtHistory',
    tableName: 'customer_debt_history',
    freezeTableName: true,
    timestamps: false
  });
  return CustomerDebtHistory;
};
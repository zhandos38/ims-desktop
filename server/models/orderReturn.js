'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderReturn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderReturn.hasMany(models.OrderReturnItems, {
        foreignKey: {
          name: 'order_return_id',
          allowNull: false
        }
      })
    }
  };
  OrderReturn.init({
    order_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    created_at: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderReturn',
    tableName: "order_return",
    freezeTableName: true,
    timestamps: false
  });
  return OrderReturn;
};
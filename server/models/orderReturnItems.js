'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderReturnItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderReturnItems.init({
    order_return_id: DataTypes.INTEGER,
    order_items_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    shift_id: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    created_at: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderReturnItems',
    tableName: 'order_return_items',
    freezeTableName: true,
    timestamps: false
  });
  return OrderReturnItems;
};
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItems.init(
    {
      product_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      barcode: DataTypes.STRING,
      quantity: DataTypes.DECIMAL,
      price: DataTypes.DECIMAL,
      status: DataTypes.TINYINT,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "OrderItems",
      tableName: "order_items",
      freezeTableName: true,
      timestamps: false
    }
  );
  return OrderItems;
};

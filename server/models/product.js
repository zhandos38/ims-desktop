"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      barcode: DataTypes.STRING,
      quantity: DataTypes.DECIMAL,
      category_id: DataTypes.INTEGER,
      price_retail: DataTypes.INTEGER,
      price_wholesale: DataTypes.DECIMAL,
      percentage_rate: DataTypes.TINYINT,
      wholesale_value: DataTypes.TINYINT,
      unit: DataTypes.STRING,
      type: DataTypes.TINYINT,
      piece_quantity: DataTypes.TINYINT,
      piece_price: DataTypes.TINYINT,
      status: DataTypes.TINYINT,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Product",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Product;
};

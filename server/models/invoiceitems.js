"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceItems.init(
    {
      invoice_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      barcode: DataTypes.STRING,
      name: DataTypes.STRING,
      quantity: DataTypes.DECIMAL,
      price_in: DataTypes.DECIMAL
    },
    {
      sequelize,
      modelName: "InvoiceItems",
      freezeTableName: true,
      timestamps: false
    }
  );
  return InvoiceItems;
};

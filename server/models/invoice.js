"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init(
    {
      number_in: DataTypes.STRING,
      is_debt: DataTypes.BOOLEAN,
      status: DataTypes.TINYINT,
      supplier_id: DataTypes.INTEGER,
      cost: DataTypes.DECIMAL,
      created_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Invoice",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Invoice;
};

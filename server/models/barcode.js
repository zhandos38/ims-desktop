"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Barcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barcode.init(
    {
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      unit: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Barcode",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Barcode;
};

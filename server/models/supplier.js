"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Supplier.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      created_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Supplier",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Supplier;
};

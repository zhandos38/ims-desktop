"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cashbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cashbox.init(
    {
      name: DataTypes.STRING,
      balance: DataTypes.DECIMAL,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Cashbox",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Cashbox;
};

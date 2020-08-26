"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      full_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthday_date: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      debt_sum: DataTypes.DECIMAL,
      sale_sum: DataTypes.DECIMAL,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Customer",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Customer;
};

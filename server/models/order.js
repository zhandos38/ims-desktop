"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      number: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      cost: DataTypes.DECIMAL,
      amount_discount: DataTypes.DECIMAL,
      cost_total: DataTypes.DECIMAL,
      amount_card: DataTypes.DECIMAL,
      amount_cash: DataTypes.DECIMAL,
      pay_method: DataTypes.TINYINT(3),
      pay_status: DataTypes.TINYINT(3),
      status: DataTypes.TINYINT(2),
      is_debt: DataTypes.BOOLEAN,
      amount_debt: DataTypes.DECIMAL,
      shift_id: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Order",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Order;
};

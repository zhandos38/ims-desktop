"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CashboxTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CashboxTransactions.belongsTo(models.Cashbox, {
        foreignKey: "cashbox_id"
      });
      CashboxTransactions.belongsTo(models.User, {
        foreignKey: "user_id"
      });
      CashboxTransactions.belongsTo(models.Shift, {
        foreignKey: "shift_id"
      });
    }
  }
  CashboxTransactions.init(
    {
      cashbox_id: DataTypes.INTEGER,
      type: DataTypes.TINYINT(2),
      amount: DataTypes.DECIMAL,
      user_id: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      shift_id: DataTypes.INTEGER,
      method: DataTypes.TINYINT(2),
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "CashboxTransactions",
      tableName: "cashbox_transactions",
      freezeTableName: true,
      timestamps: false
    }
  );
  return CashboxTransactions;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shift.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
          allowNull: false
        }
      });
      Shift.belongsTo(models.Cashbox, {
        foreignKey: {
          name: "cashbox_id",
          allowNull: false
        }
      });
    }
  }
  Shift.init(
    {
      user_id: DataTypes.INTEGER,
      cashbox_id: DataTypes.INTEGER,
      sum_at_open: DataTypes.DECIMAL,
      sum_at_close: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN,
      opened_at: DataTypes.INTEGER,
      closed_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Shift",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Shift;
};

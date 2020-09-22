"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Revision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Revision.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
          allowNull: true
        }
      });
    }
  }
  Revision.init(
    {
      user_id: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      created_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Revision",
      tableName: "revision",
      freezeTableName: true,
      timestamps: false
    }
  );
  return Revision;
};

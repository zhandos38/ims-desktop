"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      full_name: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      cashbox_id: DataTypes.INTEGER,
      role: DataTypes.STRING,
      status: DataTypes.INTEGER,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      timestamps: false
    }
  );
  return User;
};

const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.sequelize.define(
  "customer",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    birthday_date: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    debt_sum: {
      type: Sequelize.DECIMAL
    },
    sale_sum: {
      type: Sequelize.DECIMAL
    },
    created_at: {
      type: Sequelize.INTEGER
    },
    updated_at: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

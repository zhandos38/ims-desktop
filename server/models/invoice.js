const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.sequelize.define(
  "invoice",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number_in: {
      type: Sequelize.STRING
    },
    is_debt: {
      type: Sequelize.BOOLEAN
    },
    status: {
      type: Sequelize.TINYINT
    },
    supplier_id: {
      type: Sequelize.FLOAT
    },
    cost: {
      type: Sequelize.DECIMAL
    },
    created_at: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

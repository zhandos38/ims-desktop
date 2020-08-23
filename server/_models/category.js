const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.sequelize.define(
  "category",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

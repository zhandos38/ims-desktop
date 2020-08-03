const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.sequelize.define(
  "barcode",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.STRING
    },
    unit: {
        type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

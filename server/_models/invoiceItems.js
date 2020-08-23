const Sequelize = require("sequelize"),
  db = require("../database"),
  Invoice = require("./invoice");

const InvoiceItems = db.sequelize.define(
  "invoice_items",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    invoice_id: {
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    barcode: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.DECIMAL
    },
    price_in: {
      type: Sequelize.DECIMAL
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

module.exports = InvoiceItems;

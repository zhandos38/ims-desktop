const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    barcode: {
      type: Sequelize.STRING
    },
      quantity: {
          type: Sequelize.DECIMAL
      },
    category_id: {
        type: Sequelize.INTEGER
    },
    price_retail: {
      type: Sequelize.DECIMAL
    },
    price_wholesale: {
        type: Sequelize.DECIMAL
    },
      percentage_rate: {
          type: Sequelize.TINYINT
      },
      wholesale_value: {
          type: Sequelize.TINYINT
      },
    unit: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.TINYINT
    },
    is_piece: {
        type: Sequelize.TINYINT
    },
      piece_quantity: {
          type: Sequelize.TINYINT
      },
      piece_price: {
          type: Sequelize.TINYINT
      },
      status: {
          type: Sequelize.TINYINT
      },
    created_at: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

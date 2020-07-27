const Sequelize = require("sequelize");

const db = {};
const sequelize = new Sequelize("cash_db", "root", "", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

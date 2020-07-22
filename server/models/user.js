const Sequelize = require('sequelize')
const db = require('../database')

module.exports = db.sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
      },
      password_hash: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.FLOAT
      }
    },
    {
      timestamps: false,
    }
)

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
        full_name: {
            type: Sequelize.STRING,
        },
      password_hash: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.FLOAT
      },
        role: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
        created_at: {
            type: Sequelize.INTEGER,
        },
        updated_at: {
            type: Sequelize.INTEGER,
        }
    },
    {
      timestamps: false,
    }
)

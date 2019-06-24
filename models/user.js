const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.BLOB('long'),
    allowNull: false,
  },
  pdf: {
    type: Sequelize.BLOB('long'),
  },
});

module.exports = User;

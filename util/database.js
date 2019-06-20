const Sequelize = require('sequelize');

const sequelize = new Sequelize('Mc1ETcHTA7', 'Mc1ETcHTA7', 'KC8TBbOIih', {
  dialect: 'mysql',
  host: 'remotemysql.com',
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'trabalho_web2',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;


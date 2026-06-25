const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    unique: true
  },

  senha: {
    type: DataTypes.STRING
  },

  role: {
    type: DataTypes.STRING
  }
});

module.exports = Usuario;
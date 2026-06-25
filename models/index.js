const sequelize = require('../config/database');
const Usuario = require('./Usuario');

sequelize.sync();

module.exports = {
    sequelize,
    Usuario
};
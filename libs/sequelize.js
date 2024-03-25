const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels = require('./../db/models');


const connectionString = config.dbUrl;

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: config.isProd ? false : true,
    ...(config.isProd && {
        ssl: {
            rejectUnauthorized: false
        }
    })
});

setupModels(sequelize);

module.exports = sequelize;
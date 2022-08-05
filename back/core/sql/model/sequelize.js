
const Sequelize = require('sequelize');
const settings = require("./../../../setting/loadSetting");
settings.initializeEnvironmentSettings();
const config = require("./../../../config").getConfig();

const sequelize = new Sequelize(config.SQL.DATABASE, config.SQL.USER, config.SQL.PASSWORD, {
  host: config.SQL.HOST,
  port: config.SQL.PORT,
  dialect: 'mysql',
  logging: console.log
});

module.exports = {
  sequelize, Sequelize
};

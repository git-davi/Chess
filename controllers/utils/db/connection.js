'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'chess_db',
    'chess', // user
    'chess', // password
    {
        host: 'localhost',
        dialect: 'mysql',
        //--------------mariadb-------------
        //dialect: 'mariadb',
        //dialectOptions: {
        //    timezone: 'Etc/GMT0',
        //},
        //-----------------------------
        logging: false
    }
);

/*
// Test  DB connection

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  */

module.exports = sequelize;

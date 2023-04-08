import dotenv from "dotenv";
import {Sequelize} from "sequelize";
const config = dotenv.config();


const sequelize = new Sequelize(
  process.env.MYSQL_SCHEMA,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = {sequelize};


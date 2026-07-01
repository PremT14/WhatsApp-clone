import {Sequelize} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const sequelize = new Sequelize(dbName as string, dbUser as string, dbPassword as string, {
  dialect: 'mysql',
  host: 'localhost'
});

export default sequelize;
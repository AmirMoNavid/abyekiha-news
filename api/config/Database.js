import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config("../.env");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME ?? "localhost",
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
    logging: false,
  }
);

export default db;

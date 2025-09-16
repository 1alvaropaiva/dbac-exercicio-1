import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) 
  throw new Error("DATABASE_URL não encontrado no .env");


const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { rejectUnauthorized: false }, 
  },
  logging: console.log
});

export default sequelize;
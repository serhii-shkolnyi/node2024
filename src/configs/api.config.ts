import { config } from "dotenv";

config();

export const apiConfig = {
  PORT: process.env.PORT || 5001,

  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/node2024",

  SALT_ROUNDS: process.env.SALT_ROUNDS || 5,

  EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
  EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

import { config } from "dotenv";

config();

export const apiConfig = {
  PORT: process.env.PORT || 5001,
};

import dotenv from "dotenv";

dotenv.config();

export const {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  JWT_TOKEN_SECERT,
  JWT_REFRESH_TOKEN_SECERT,
} = process.env;

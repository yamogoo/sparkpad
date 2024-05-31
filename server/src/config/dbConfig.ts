import { normalizePort } from "@/utils/normalize";

enum DBConfig {
  DEFAULT_DB_HOST = "localhost",
  DEFAULT_DB_PORT = "5432",
  DEFAULT_DB_NAME = "test",
  DEFAULT_DB_USER_NAME = "postgres",
  DEFAULT_DB_PASSWORD = "test",
}

export const config = {
  HOST: process.env.DB_HOST ?? DBConfig.DEFAULT_DB_HOST,
  PORT: normalizePort(process.env.DB_PORT ?? DBConfig.DEFAULT_DB_PORT),
  USER: process.env.DB_USER_NAME ?? DBConfig.DEFAULT_DB_USER_NAME,
  PASSWORD: process.env.DB_PASSWORD ?? DBConfig.DEFAULT_DB_PASSWORD,
  DB: process.env.DB_NAME ?? DBConfig.DEFAULT_DB_NAME,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

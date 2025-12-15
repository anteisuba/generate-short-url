import { Sequelize } from "sequelize";
import { logger } from "./loggerHelper.js";

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const CONNECT_TIMEOUT_MS = Number(process.env.DB_CONNECT_TIMEOUT_MS || 5000);

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "postgres",
    port: dbConfig.port,
    dialectOptions: { connectTimeout: CONNECT_TIMEOUT_MS },
    pool: { acquire: CONNECT_TIMEOUT_MS },
    logging: (...msg) => logger.info(msg),
  }
);

try {
  logger.info(
    `Connecting to Postgres ${dbConfig.host}:${dbConfig.port}/${dbConfig.database} (timeout ${CONNECT_TIMEOUT_MS}ms)`
  );
  const connectionCheck = sequelize.authenticate();
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(new Error(`DB connect timed out after ${CONNECT_TIMEOUT_MS}ms`)),
      CONNECT_TIMEOUT_MS
    )
  );
  await Promise.race([connectionCheck, timeout]);
  logger.info("Connection has been established successfully.");
} catch (error) {
  logger.error("Unable to connect to the database:", error);
  process.exit(1);
}

export default sequelize;

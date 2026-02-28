import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "../entities/todo.entity";
import { User } from "../entities/user.entity";

const isProduction = process.env.ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(isProduction
    ? { url: process.env.DB_URL }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
  synchronize: process.env.SYNC_DB === "true",
  logging: false,
  entities: [Todo, User],
});

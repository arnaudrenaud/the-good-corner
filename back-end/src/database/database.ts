import { DataSource } from "typeorm";
import Ad from "../entities/ad";
import Category from "../entities/category";
import Tag from "../entities/tag";
import User from "../entities/user";
import UserSession from "../entities/userSession";

let dataSource: DataSource;

export function getNewDataSource(): DataSource {
  return new DataSource({
    type: "postgres",
    url:
      process.env.NODE_ENV === "test"
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,
    entities: [Ad, Category, Tag, User, UserSession],
    migrations: [__dirname + "/migrations/*.{js,ts}"],
    migrationsRun: true,
  });
}

export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = getNewDataSource();
    await dataSource.initialize();
  }
  return dataSource;
};

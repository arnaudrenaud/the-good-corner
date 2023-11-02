import { DataSource } from "typeorm";
import "reflect-metadata";

import Ad from "./entities/ad";
import Category from "./entities/category";
import Tag from "./entities/tag";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import { TagResolver } from "./resolvers/TagResolver";

const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
});

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AdResolver, TagResolver],
    validate: true,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  await dataSource.initialize();
  await Category.saveNewCategoryIfNotExisting({ id: 1, name: "Ameublement" });
  await Category.saveNewCategoryIfNotExisting({
    id: 2,
    name: "Électroménager",
  });
  await Category.saveNewCategoryIfNotExisting({ id: 3, name: "Photographie" });
  await Category.saveNewCategoryIfNotExisting({ id: 4, name: "Informatique" });
  await Category.saveNewCategoryIfNotExisting({ id: 5, name: "Téléphonie" });
  await Category.saveNewCategoryIfNotExisting({ id: 6, name: "Vélos" });
  await Category.saveNewCategoryIfNotExisting({ id: 7, name: "Véhicules" });
  await Category.saveNewCategoryIfNotExisting({ id: 8, name: "Sport" });
  await Category.saveNewCategoryIfNotExisting({ id: 9, name: "Habillement" });
  await Category.saveNewCategoryIfNotExisting({ id: 10, name: "Bébé" });
  await Category.saveNewCategoryIfNotExisting({ id: 11, name: "Outillage" });
  await Category.saveNewCategoryIfNotExisting({ id: 12, name: "Services" });
  await Category.saveNewCategoryIfNotExisting({ id: 13, name: "Vacances" });

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();

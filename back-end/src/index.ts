import express from "express";
import { DataSource } from "typeorm";
import "reflect-metadata";

import Ad from "./entities/ad";
import { isError } from "./utils";
import Category from "./entities/category";
import Tag from "./entities/tag";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";

const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AdResolver],
    validate: true,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();

const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
});

const server = express();
server.use(express.json());

// Hello world
server.get("/", (request, response) => {
  return response.send("Hello from Express server.");
});

// GET /ads
// exemple de requête : /ads, /ads?category=1
server.get("/ads", async (request, response) => {
  const { query } = request;
  const ads = await Ad.getAds(
    query.category ? parseInt(query.category as string) : undefined
  );
  return response.json({ ads });
});

// POST /ads
server.post("/ads", async (request, response) => {
  const adData = request.body;
  try {
    const savedAd = await Ad.saveNewAd(adData);
    return response.status(201).json({ ad: savedAd });
  } catch (error) {
    if (isError(error)) {
      return response.status(400).json({ error: error.message });
    }
  }
});

// GET /ads/:id
server.get("/ads/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const ad = await Ad.getAdById(id);
    return response.json({ ad });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

// DELETE /ads/:id
server.delete("/ads/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await Ad.deleteAd(id);
    return response.json({ id });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

// PUT /ads/:id
server.put("/ads/:id", async (request, response) => {
  const id = request.params.id;
  const adData = request.body;

  if (adData.title === "") {
    return response.status(400).json({ error: "Title cannot be empty." });
  }
  if (adData.owner === "") {
    return response.status(400).json({ error: "Owner cannot be empty." });
  }

  try {
    const updatedAd = await Ad.updateAd(id, adData);
    return response.json({ ad: updatedAd });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

server.get("/tags", async (request, response) => {
  const tags = await Tag.getTags();
  return response.json({ tags });
});

server.post("/tags", async (request, response) => {
  const tagData = request.body;
  try {
    const savedTag = await Tag.saveNewTag(tagData);
    return response.status(201).json({ tag: savedTag });
  } catch (error) {
    if (isError(error)) {
      return response.status(400).json({ error: error.message });
    }
  }
});

const PORT = 4000;
server.listen(PORT, async () => {
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

  console.log(`Server listening on port ${PORT}.`);
});

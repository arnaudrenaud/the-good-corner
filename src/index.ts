import express from "express";
import { DataSource } from "typeorm";

import Ad from "./entities/ad";
import { isError } from "./utils";
import Category from "./entities/category";
import Tag from "./entities/tag";

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
server.get("/ads", async (request, response) => {
  const ads = await Ad.getAds();
  return response.json({ ads });
});

// POST /ads
server.post("/ads", async (request, response) => {
  const adData = request.body;
  const savedAd = await Ad.saveNewAd(adData);
  return response.status(201).json({ ad: savedAd });
});

// GET /ads/:id
server.get("/ads/:id", async (request, response) => {
  const id = parseInt(request.params.id);

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
  const id = parseInt(request.params.id);

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
  const id = parseInt(request.params.id);
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

const PORT = 4000;
server.listen(PORT, async () => {
  await dataSource.initialize();
  await Category.saveNewCategoryIfNotExisting({ name: "Automobile" });
  await Category.saveNewCategoryIfNotExisting({ name: "Habillement" });
  await Category.saveNewCategoryIfNotExisting({ name: "Autre" });

  console.log(`Server listening on port ${PORT}.`);
});
